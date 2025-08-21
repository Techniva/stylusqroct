import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminAuth } from '@/lib/adminAuth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const planId = parseInt(resolvedParams.id);
    const body = await request.json();
    const { name, description, priceMonthly, priceYearly, qrCodesLimit, features, isActive } = body;

    // Get current plan for logging
    const currentPlan = await prisma.pricingPlan.findUnique({
      where: { id: planId }
    });

    if (!currentPlan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Handle features - convert to JSON string if it's an array
    let featuresString = features;
    if (Array.isArray(features)) {
      featuresString = JSON.stringify(features.filter((f: string) => f.trim() !== ''));
    } else if (typeof features === 'string') {
      // If it's already a JSON string, validate it
      try {
        const parsedFeatures = JSON.parse(features);
        featuresString = JSON.stringify(parsedFeatures.filter((f: string) => f.trim() !== ''));
      } catch (error) {
        featuresString = JSON.stringify([]);
      }
    }

    const updatedPlan = await prisma.pricingPlan.update({
      where: { id: planId },
      data: {
        name,
        description,
        priceMonthly: parseFloat(priceMonthly),
        priceYearly: parseFloat(priceYearly),
        qrCodesLimit: parseInt(qrCodesLimit),
        features: featuresString,
        isActive
      }
    });

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: admin.id,
        actionType: 'plan_updated',
        description: `Admin ${admin.username} updated plan "${name}"`,
        oldValue: JSON.stringify({
          id: currentPlan.id,
          name: currentPlan.name,
          priceMonthly: currentPlan.priceMonthly,
          priceYearly: currentPlan.priceYearly,
          qrCodesLimit: currentPlan.qrCodesLimit,
          isActive: currentPlan.isActive
        }).substring(0, 1000), // Limit to 1000 characters
        newValue: JSON.stringify({
          id: updatedPlan.id,
          name: updatedPlan.name,
          priceMonthly: updatedPlan.priceMonthly,
          priceYearly: updatedPlan.priceYearly,
          qrCodesLimit: updatedPlan.qrCodesLimit,
          isActive: updatedPlan.isActive
        }).substring(0, 1000) // Limit to 1000 characters
      }
    });

    return NextResponse.json({
      success: true,
      plan: updatedPlan
    });
  } catch (error) {
    console.error('Error updating plan:', error);
    return NextResponse.json(
      { error: 'Failed to update plan' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { admin } = await getAdminAuth();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const resolvedParams = await params;
    const planId = parseInt(resolvedParams.id);

    // Check if plan exists and get its details
    const plan = await prisma.pricingPlan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      );
    }

    // Check if any users are subscribed to this plan
    const usersWithPlan = await prisma.user.count({
      where: { subscriptionId: planId }
    });

    if (usersWithPlan > 0) {
      return NextResponse.json(
        { error: `Cannot delete plan. ${usersWithPlan} users are currently subscribed to this plan.` },
        { status: 400 }
      );
    }

    // Delete the plan
    await prisma.pricingPlan.delete({
      where: { id: planId }
    });

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: admin.id,
        actionType: 'plan_deleted',
        description: `Admin ${admin.username} deleted plan "${plan.name}"`,
        oldValue: JSON.stringify({
          id: plan.id,
          name: plan.name,
          priceMonthly: plan.priceMonthly,
          priceYearly: plan.priceYearly,
          qrCodesLimit: plan.qrCodesLimit,
          isActive: plan.isActive
        }).substring(0, 1000) // Limit to 1000 characters
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete plan' },
      { status: 500 }
    );
  }
} 