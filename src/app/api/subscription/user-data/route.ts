import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { user } = await getAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user with subscription data and count actual QR codes
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        subscription: true,
        qrCodes: true
      }
    });

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // If user has no subscription, get the Free subscription and set up dates
    let subscription = userData.subscription;
    let needsUpdate = false;
    
    if (!subscription) {

      subscription = await prisma.subscription.findFirst({
        where: { name: 'Free', isActive: true }
      });
      
      if (!subscription) {
        // Create Free subscription if it doesn't exist
        subscription = await prisma.subscription.create({
          data: {
            name: 'Free',
            description: 'Perfect for getting started',
            priceMonthly: 0,
            priceYearly: 0,
            qrCodesLimit: 5,
            features: JSON.stringify(['5 QR codes', 'Basic analytics', 'Standard templates', 'Email support']),
            isActive: true
          }
        });
      }
      
      // Set up subscription dates for free users
      if (!userData.subscriptionStart) {
        const registrationDate = userData.createdAt;
        const subscriptionEndDate = new Date(registrationDate);
        subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30); // 30 days validity
        
        // Update user with subscription dates
        await prisma.user.update({
          where: { id: user.id },
          data: {
            subscriptionId: subscription.id,
            subscriptionStart: registrationDate,
            subscriptionEnd: subscriptionEndDate
          }
        });
        
        // Update userData with new dates
        userData.subscriptionStart = registrationDate;
        userData.subscriptionEnd = subscriptionEndDate;
        userData.subscriptionId = subscription.id;
        

      }
    }

    // Get corresponding PricingPlan data based on subscription name
    let pricingPlan = null;
    if (subscription) {
      pricingPlan = await prisma.pricingPlan.findFirst({
        where: { 
          name: subscription.name,
          isActive: true 
        }
      });
    }

    // Parse features from JSON string
    let features: string[] = [];
    if (subscription?.features) {
      try {
        features = JSON.parse(subscription.features);
      } catch (error) {
        console.error('Error parsing features:', error);
        features = ['5 QR codes', 'Basic analytics', 'Standard templates', 'Email support'];
      }
    }

    // Count actual QR codes created by the user
    const actualQrCodesUsed = userData.qrCodes ? userData.qrCodes.length : 0;
    
    // Check if subscription is still active (not expired)
    const now = new Date();
    const subscriptionEndDate = userData.subscriptionEnd ? new Date(userData.subscriptionEnd) : null;
    const isSubscriptionActive = subscriptionEndDate && subscriptionEndDate > now;
    
    const subscriptionData = {
      planName: subscription?.name || 'Free',
      planDescription: subscription?.description || 'Perfect for getting started with QR codes',
      priceMonthly: subscription?.priceMonthly || 0,
      priceYearly: subscription?.priceYearly || 0,
      qrCodesLimit: userData.qrCodesLimit || subscription?.qrCodesLimit || 5,
      qrCodesUsed: actualQrCodesUsed, // Use actual count instead of stored field
      features: features,
      isActive: userData.isActive || true,
      subscriptionStart: userData.subscriptionStart?.toISOString(),
      subscriptionEnd: userData.subscriptionEnd?.toISOString(),
      hasActiveSubscription: !!userData.subscriptionStart && !!userData.subscriptionEnd && isSubscriptionActive,
      // Add PricingPlan data for Usage Statistics
      pricingPlan: pricingPlan ? {
        id: pricingPlan.id,
        name: pricingPlan.name,
        description: pricingPlan.description,
        priceMonthly: pricingPlan.priceMonthly,
        priceYearly: pricingPlan.priceYearly,
        qrCodesLimit: pricingPlan.qrCodesLimit,
        features: pricingPlan.features
      } : null
    };

    return NextResponse.json(subscriptionData);
  } catch (error) {
    console.error('Error fetching user subscription data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription data' },
      { status: 500 }
    );
  }
} 