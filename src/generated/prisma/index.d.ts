
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>
/**
 * Model AdminAction
 * 
 */
export type AdminAction = $Result.DefaultSelection<Prisma.$AdminActionPayload>
/**
 * Model QRCode
 * 
 */
export type QRCode = $Result.DefaultSelection<Prisma.$QRCodePayload>
/**
 * Model ScanLog
 * 
 */
export type ScanLog = $Result.DefaultSelection<Prisma.$ScanLogPayload>
/**
 * Model DownloadLog
 * 
 */
export type DownloadLog = $Result.DefaultSelection<Prisma.$DownloadLogPayload>
/**
 * Model ProfileUpdateLog
 * 
 */
export type ProfileUpdateLog = $Result.DefaultSelection<Prisma.$ProfileUpdateLogPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model PricingPlan
 * 
 */
export type PricingPlan = $Result.DefaultSelection<Prisma.$PricingPlanPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model DigitalBusinessCard
 * 
 */
export type DigitalBusinessCard = $Result.DefaultSelection<Prisma.$DigitalBusinessCardPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminAction`: Exposes CRUD operations for the **AdminAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminActions
    * const adminActions = await prisma.adminAction.findMany()
    * ```
    */
  get adminAction(): Prisma.AdminActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qRCode`: Exposes CRUD operations for the **QRCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QRCodes
    * const qRCodes = await prisma.qRCode.findMany()
    * ```
    */
  get qRCode(): Prisma.QRCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scanLog`: Exposes CRUD operations for the **ScanLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScanLogs
    * const scanLogs = await prisma.scanLog.findMany()
    * ```
    */
  get scanLog(): Prisma.ScanLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.downloadLog`: Exposes CRUD operations for the **DownloadLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DownloadLogs
    * const downloadLogs = await prisma.downloadLog.findMany()
    * ```
    */
  get downloadLog(): Prisma.DownloadLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.profileUpdateLog`: Exposes CRUD operations for the **ProfileUpdateLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfileUpdateLogs
    * const profileUpdateLogs = await prisma.profileUpdateLog.findMany()
    * ```
    */
  get profileUpdateLog(): Prisma.ProfileUpdateLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pricingPlan`: Exposes CRUD operations for the **PricingPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PricingPlans
    * const pricingPlans = await prisma.pricingPlan.findMany()
    * ```
    */
  get pricingPlan(): Prisma.PricingPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.digitalBusinessCard`: Exposes CRUD operations for the **DigitalBusinessCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DigitalBusinessCards
    * const digitalBusinessCards = await prisma.digitalBusinessCard.findMany()
    * ```
    */
  get digitalBusinessCard(): Prisma.DigitalBusinessCardDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    AdminUser: 'AdminUser',
    AdminAction: 'AdminAction',
    QRCode: 'QRCode',
    ScanLog: 'ScanLog',
    DownloadLog: 'DownloadLog',
    ProfileUpdateLog: 'ProfileUpdateLog',
    Subscription: 'Subscription',
    PricingPlan: 'PricingPlan',
    Payment: 'Payment',
    DigitalBusinessCard: 'DigitalBusinessCard'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "adminUser" | "adminAction" | "qRCode" | "scanLog" | "downloadLog" | "profileUpdateLog" | "subscription" | "pricingPlan" | "payment" | "digitalBusinessCard"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
      AdminAction: {
        payload: Prisma.$AdminActionPayload<ExtArgs>
        fields: Prisma.AdminActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          findFirst: {
            args: Prisma.AdminActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          findMany: {
            args: Prisma.AdminActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>[]
          }
          create: {
            args: Prisma.AdminActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          createMany: {
            args: Prisma.AdminActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdminActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          update: {
            args: Prisma.AdminActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          deleteMany: {
            args: Prisma.AdminActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminActionPayload>
          }
          aggregate: {
            args: Prisma.AdminActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminAction>
          }
          groupBy: {
            args: Prisma.AdminActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminActionCountArgs<ExtArgs>
            result: $Utils.Optional<AdminActionCountAggregateOutputType> | number
          }
        }
      }
      QRCode: {
        payload: Prisma.$QRCodePayload<ExtArgs>
        fields: Prisma.QRCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QRCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QRCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          findFirst: {
            args: Prisma.QRCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QRCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          findMany: {
            args: Prisma.QRCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>[]
          }
          create: {
            args: Prisma.QRCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          createMany: {
            args: Prisma.QRCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QRCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          update: {
            args: Prisma.QRCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          deleteMany: {
            args: Prisma.QRCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QRCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QRCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRCodePayload>
          }
          aggregate: {
            args: Prisma.QRCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQRCode>
          }
          groupBy: {
            args: Prisma.QRCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<QRCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.QRCodeCountArgs<ExtArgs>
            result: $Utils.Optional<QRCodeCountAggregateOutputType> | number
          }
        }
      }
      ScanLog: {
        payload: Prisma.$ScanLogPayload<ExtArgs>
        fields: Prisma.ScanLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScanLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScanLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload>
          }
          findFirst: {
            args: Prisma.ScanLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScanLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload>
          }
          findMany: {
            args: Prisma.ScanLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload>[]
          }
          create: {
            args: Prisma.ScanLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload>
          }
          createMany: {
            args: Prisma.ScanLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ScanLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload>
          }
          update: {
            args: Prisma.ScanLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload>
          }
          deleteMany: {
            args: Prisma.ScanLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScanLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ScanLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScanLogPayload>
          }
          aggregate: {
            args: Prisma.ScanLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScanLog>
          }
          groupBy: {
            args: Prisma.ScanLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScanLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScanLogCountArgs<ExtArgs>
            result: $Utils.Optional<ScanLogCountAggregateOutputType> | number
          }
        }
      }
      DownloadLog: {
        payload: Prisma.$DownloadLogPayload<ExtArgs>
        fields: Prisma.DownloadLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DownloadLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DownloadLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          findFirst: {
            args: Prisma.DownloadLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DownloadLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          findMany: {
            args: Prisma.DownloadLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>[]
          }
          create: {
            args: Prisma.DownloadLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          createMany: {
            args: Prisma.DownloadLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DownloadLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          update: {
            args: Prisma.DownloadLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          deleteMany: {
            args: Prisma.DownloadLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DownloadLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DownloadLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DownloadLogPayload>
          }
          aggregate: {
            args: Prisma.DownloadLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDownloadLog>
          }
          groupBy: {
            args: Prisma.DownloadLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DownloadLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DownloadLogCountArgs<ExtArgs>
            result: $Utils.Optional<DownloadLogCountAggregateOutputType> | number
          }
        }
      }
      ProfileUpdateLog: {
        payload: Prisma.$ProfileUpdateLogPayload<ExtArgs>
        fields: Prisma.ProfileUpdateLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfileUpdateLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfileUpdateLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload>
          }
          findFirst: {
            args: Prisma.ProfileUpdateLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfileUpdateLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload>
          }
          findMany: {
            args: Prisma.ProfileUpdateLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload>[]
          }
          create: {
            args: Prisma.ProfileUpdateLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload>
          }
          createMany: {
            args: Prisma.ProfileUpdateLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfileUpdateLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload>
          }
          update: {
            args: Prisma.ProfileUpdateLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload>
          }
          deleteMany: {
            args: Prisma.ProfileUpdateLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfileUpdateLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfileUpdateLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfileUpdateLogPayload>
          }
          aggregate: {
            args: Prisma.ProfileUpdateLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfileUpdateLog>
          }
          groupBy: {
            args: Prisma.ProfileUpdateLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfileUpdateLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfileUpdateLogCountArgs<ExtArgs>
            result: $Utils.Optional<ProfileUpdateLogCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      PricingPlan: {
        payload: Prisma.$PricingPlanPayload<ExtArgs>
        fields: Prisma.PricingPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PricingPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PricingPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload>
          }
          findFirst: {
            args: Prisma.PricingPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PricingPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload>
          }
          findMany: {
            args: Prisma.PricingPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload>[]
          }
          create: {
            args: Prisma.PricingPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload>
          }
          createMany: {
            args: Prisma.PricingPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PricingPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload>
          }
          update: {
            args: Prisma.PricingPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload>
          }
          deleteMany: {
            args: Prisma.PricingPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PricingPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PricingPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PricingPlanPayload>
          }
          aggregate: {
            args: Prisma.PricingPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePricingPlan>
          }
          groupBy: {
            args: Prisma.PricingPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PricingPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PricingPlanCountArgs<ExtArgs>
            result: $Utils.Optional<PricingPlanCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      DigitalBusinessCard: {
        payload: Prisma.$DigitalBusinessCardPayload<ExtArgs>
        fields: Prisma.DigitalBusinessCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DigitalBusinessCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DigitalBusinessCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload>
          }
          findFirst: {
            args: Prisma.DigitalBusinessCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DigitalBusinessCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload>
          }
          findMany: {
            args: Prisma.DigitalBusinessCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload>[]
          }
          create: {
            args: Prisma.DigitalBusinessCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload>
          }
          createMany: {
            args: Prisma.DigitalBusinessCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.DigitalBusinessCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload>
          }
          update: {
            args: Prisma.DigitalBusinessCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload>
          }
          deleteMany: {
            args: Prisma.DigitalBusinessCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DigitalBusinessCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DigitalBusinessCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DigitalBusinessCardPayload>
          }
          aggregate: {
            args: Prisma.DigitalBusinessCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDigitalBusinessCard>
          }
          groupBy: {
            args: Prisma.DigitalBusinessCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<DigitalBusinessCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.DigitalBusinessCardCountArgs<ExtArgs>
            result: $Utils.Optional<DigitalBusinessCardCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    adminUser?: AdminUserOmit
    adminAction?: AdminActionOmit
    qRCode?: QRCodeOmit
    scanLog?: ScanLogOmit
    downloadLog?: DownloadLogOmit
    profileUpdateLog?: ProfileUpdateLogOmit
    subscription?: SubscriptionOmit
    pricingPlan?: PricingPlanOmit
    payment?: PaymentOmit
    digitalBusinessCard?: DigitalBusinessCardOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    qrCodes: number
    profileUpdateLogs: number
    payments: number
    adminActions: number
    digitalBusinessCards: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    qrCodes?: boolean | UserCountOutputTypeCountQrCodesArgs
    profileUpdateLogs?: boolean | UserCountOutputTypeCountProfileUpdateLogsArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    adminActions?: boolean | UserCountOutputTypeCountAdminActionsArgs
    digitalBusinessCards?: boolean | UserCountOutputTypeCountDigitalBusinessCardsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountQrCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QRCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProfileUpdateLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileUpdateLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAdminActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminActionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDigitalBusinessCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DigitalBusinessCardWhereInput
  }


  /**
   * Count Type AdminUserCountOutputType
   */

  export type AdminUserCountOutputType = {
    actions: number
  }

  export type AdminUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actions?: boolean | AdminUserCountOutputTypeCountActionsArgs
  }

  // Custom InputTypes
  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUserCountOutputType
     */
    select?: AdminUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminUserCountOutputType without action
   */
  export type AdminUserCountOutputTypeCountActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminActionWhereInput
  }


  /**
   * Count Type QRCodeCountOutputType
   */

  export type QRCodeCountOutputType = {
    scanLogs: number
    downloadLogs: number
  }

  export type QRCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scanLogs?: boolean | QRCodeCountOutputTypeCountScanLogsArgs
    downloadLogs?: boolean | QRCodeCountOutputTypeCountDownloadLogsArgs
  }

  // Custom InputTypes
  /**
   * QRCodeCountOutputType without action
   */
  export type QRCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCodeCountOutputType
     */
    select?: QRCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QRCodeCountOutputType without action
   */
  export type QRCodeCountOutputTypeCountScanLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanLogWhereInput
  }

  /**
   * QRCodeCountOutputType without action
   */
  export type QRCodeCountOutputTypeCountDownloadLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DownloadLogWhereInput
  }


  /**
   * Count Type SubscriptionCountOutputType
   */

  export type SubscriptionCountOutputType = {
    users: number
    payments: number
  }

  export type SubscriptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | SubscriptionCountOutputTypeCountUsersArgs
    payments?: boolean | SubscriptionCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriptionCountOutputType
     */
    select?: SubscriptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * SubscriptionCountOutputType without action
   */
  export type SubscriptionCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    feed_rating: number | null
    subscriptionId: number | null
    qrCodesUsed: number | null
    qrCodesLimit: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    feed_rating: number | null
    subscriptionId: number | null
    qrCodesUsed: number | null
    qrCodesLimit: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    fullName: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    location: string | null
    company: string | null
    comp_position: string | null
    usr_phone: string | null
    twoFactorSecret: string | null
    twoFactorEnabled: boolean | null
    twoFactorRecoveryCodes: string | null
    emailNotificationsEnabled: boolean | null
    smsNotificationsEnabled: boolean | null
    pushNotificationsEnabled: boolean | null
    feed_rating: number | null
    feed_type: string | null
    feed_msg: string | null
    subscriptionId: number | null
    subscriptionStart: Date | null
    subscriptionEnd: Date | null
    isActive: boolean | null
    qrCodesUsed: number | null
    qrCodesLimit: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    fullName: string | null
    email: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    location: string | null
    company: string | null
    comp_position: string | null
    usr_phone: string | null
    twoFactorSecret: string | null
    twoFactorEnabled: boolean | null
    twoFactorRecoveryCodes: string | null
    emailNotificationsEnabled: boolean | null
    smsNotificationsEnabled: boolean | null
    pushNotificationsEnabled: boolean | null
    feed_rating: number | null
    feed_type: string | null
    feed_msg: string | null
    subscriptionId: number | null
    subscriptionStart: Date | null
    subscriptionEnd: Date | null
    isActive: boolean | null
    qrCodesUsed: number | null
    qrCodesLimit: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    password: number
    createdAt: number
    updatedAt: number
    resetToken: number
    resetTokenExpiry: number
    location: number
    company: number
    comp_position: number
    usr_phone: number
    twoFactorSecret: number
    twoFactorEnabled: number
    twoFactorRecoveryCodes: number
    emailNotificationsEnabled: number
    smsNotificationsEnabled: number
    pushNotificationsEnabled: number
    feed_rating: number
    feed_type: number
    feed_msg: number
    subscriptionId: number
    subscriptionStart: number
    subscriptionEnd: number
    isActive: number
    qrCodesUsed: number
    qrCodesLimit: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    feed_rating?: true
    subscriptionId?: true
    qrCodesUsed?: true
    qrCodesLimit?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    feed_rating?: true
    subscriptionId?: true
    qrCodesUsed?: true
    qrCodesLimit?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    location?: true
    company?: true
    comp_position?: true
    usr_phone?: true
    twoFactorSecret?: true
    twoFactorEnabled?: true
    twoFactorRecoveryCodes?: true
    emailNotificationsEnabled?: true
    smsNotificationsEnabled?: true
    pushNotificationsEnabled?: true
    feed_rating?: true
    feed_type?: true
    feed_msg?: true
    subscriptionId?: true
    subscriptionStart?: true
    subscriptionEnd?: true
    isActive?: true
    qrCodesUsed?: true
    qrCodesLimit?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    location?: true
    company?: true
    comp_position?: true
    usr_phone?: true
    twoFactorSecret?: true
    twoFactorEnabled?: true
    twoFactorRecoveryCodes?: true
    emailNotificationsEnabled?: true
    smsNotificationsEnabled?: true
    pushNotificationsEnabled?: true
    feed_rating?: true
    feed_type?: true
    feed_msg?: true
    subscriptionId?: true
    subscriptionStart?: true
    subscriptionEnd?: true
    isActive?: true
    qrCodesUsed?: true
    qrCodesLimit?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    location?: true
    company?: true
    comp_position?: true
    usr_phone?: true
    twoFactorSecret?: true
    twoFactorEnabled?: true
    twoFactorRecoveryCodes?: true
    emailNotificationsEnabled?: true
    smsNotificationsEnabled?: true
    pushNotificationsEnabled?: true
    feed_rating?: true
    feed_type?: true
    feed_msg?: true
    subscriptionId?: true
    subscriptionStart?: true
    subscriptionEnd?: true
    isActive?: true
    qrCodesUsed?: true
    qrCodesLimit?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    fullName: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    resetToken: string | null
    resetTokenExpiry: Date | null
    location: string | null
    company: string | null
    comp_position: string | null
    usr_phone: string | null
    twoFactorSecret: string | null
    twoFactorEnabled: boolean
    twoFactorRecoveryCodes: string | null
    emailNotificationsEnabled: boolean
    smsNotificationsEnabled: boolean
    pushNotificationsEnabled: boolean
    feed_rating: number | null
    feed_type: string | null
    feed_msg: string | null
    subscriptionId: number | null
    subscriptionStart: Date | null
    subscriptionEnd: Date | null
    isActive: boolean
    qrCodesUsed: number
    qrCodesLimit: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    location?: boolean
    company?: boolean
    comp_position?: boolean
    usr_phone?: boolean
    twoFactorSecret?: boolean
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: boolean
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: boolean
    feed_type?: boolean
    feed_msg?: boolean
    subscriptionId?: boolean
    subscriptionStart?: boolean
    subscriptionEnd?: boolean
    isActive?: boolean
    qrCodesUsed?: boolean
    qrCodesLimit?: boolean
    qrCodes?: boolean | User$qrCodesArgs<ExtArgs>
    profileUpdateLogs?: boolean | User$profileUpdateLogsArgs<ExtArgs>
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    adminActions?: boolean | User$adminActionsArgs<ExtArgs>
    digitalBusinessCards?: boolean | User$digitalBusinessCardsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    location?: boolean
    company?: boolean
    comp_position?: boolean
    usr_phone?: boolean
    twoFactorSecret?: boolean
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: boolean
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: boolean
    feed_type?: boolean
    feed_msg?: boolean
    subscriptionId?: boolean
    subscriptionStart?: boolean
    subscriptionEnd?: boolean
    isActive?: boolean
    qrCodesUsed?: boolean
    qrCodesLimit?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "email" | "password" | "createdAt" | "updatedAt" | "resetToken" | "resetTokenExpiry" | "location" | "company" | "comp_position" | "usr_phone" | "twoFactorSecret" | "twoFactorEnabled" | "twoFactorRecoveryCodes" | "emailNotificationsEnabled" | "smsNotificationsEnabled" | "pushNotificationsEnabled" | "feed_rating" | "feed_type" | "feed_msg" | "subscriptionId" | "subscriptionStart" | "subscriptionEnd" | "isActive" | "qrCodesUsed" | "qrCodesLimit", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    qrCodes?: boolean | User$qrCodesArgs<ExtArgs>
    profileUpdateLogs?: boolean | User$profileUpdateLogsArgs<ExtArgs>
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    adminActions?: boolean | User$adminActionsArgs<ExtArgs>
    digitalBusinessCards?: boolean | User$digitalBusinessCardsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      qrCodes: Prisma.$QRCodePayload<ExtArgs>[]
      profileUpdateLogs: Prisma.$ProfileUpdateLogPayload<ExtArgs>[]
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      adminActions: Prisma.$AdminActionPayload<ExtArgs>[]
      digitalBusinessCards: Prisma.$DigitalBusinessCardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fullName: string
      email: string
      password: string
      createdAt: Date
      updatedAt: Date
      resetToken: string | null
      resetTokenExpiry: Date | null
      location: string | null
      company: string | null
      comp_position: string | null
      usr_phone: string | null
      twoFactorSecret: string | null
      twoFactorEnabled: boolean
      twoFactorRecoveryCodes: string | null
      emailNotificationsEnabled: boolean
      smsNotificationsEnabled: boolean
      pushNotificationsEnabled: boolean
      feed_rating: number | null
      feed_type: string | null
      feed_msg: string | null
      subscriptionId: number | null
      subscriptionStart: Date | null
      subscriptionEnd: Date | null
      isActive: boolean
      qrCodesUsed: number
      qrCodesLimit: number
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    qrCodes<T extends User$qrCodesArgs<ExtArgs> = {}>(args?: Subset<T, User$qrCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    profileUpdateLogs<T extends User$profileUpdateLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$profileUpdateLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subscription<T extends User$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    adminActions<T extends User$adminActionsArgs<ExtArgs> = {}>(args?: Subset<T, User$adminActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    digitalBusinessCards<T extends User$digitalBusinessCardsArgs<ExtArgs> = {}>(args?: Subset<T, User$digitalBusinessCardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly location: FieldRef<"User", 'String'>
    readonly company: FieldRef<"User", 'String'>
    readonly comp_position: FieldRef<"User", 'String'>
    readonly usr_phone: FieldRef<"User", 'String'>
    readonly twoFactorSecret: FieldRef<"User", 'String'>
    readonly twoFactorEnabled: FieldRef<"User", 'Boolean'>
    readonly twoFactorRecoveryCodes: FieldRef<"User", 'String'>
    readonly emailNotificationsEnabled: FieldRef<"User", 'Boolean'>
    readonly smsNotificationsEnabled: FieldRef<"User", 'Boolean'>
    readonly pushNotificationsEnabled: FieldRef<"User", 'Boolean'>
    readonly feed_rating: FieldRef<"User", 'Int'>
    readonly feed_type: FieldRef<"User", 'String'>
    readonly feed_msg: FieldRef<"User", 'String'>
    readonly subscriptionId: FieldRef<"User", 'Int'>
    readonly subscriptionStart: FieldRef<"User", 'DateTime'>
    readonly subscriptionEnd: FieldRef<"User", 'DateTime'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly qrCodesUsed: FieldRef<"User", 'Int'>
    readonly qrCodesLimit: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.qrCodes
   */
  export type User$qrCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    where?: QRCodeWhereInput
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    cursor?: QRCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QRCodeScalarFieldEnum | QRCodeScalarFieldEnum[]
  }

  /**
   * User.profileUpdateLogs
   */
  export type User$profileUpdateLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    where?: ProfileUpdateLogWhereInput
    orderBy?: ProfileUpdateLogOrderByWithRelationInput | ProfileUpdateLogOrderByWithRelationInput[]
    cursor?: ProfileUpdateLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfileUpdateLogScalarFieldEnum | ProfileUpdateLogScalarFieldEnum[]
  }

  /**
   * User.subscription
   */
  export type User$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.adminActions
   */
  export type User$adminActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    where?: AdminActionWhereInput
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    cursor?: AdminActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * User.digitalBusinessCards
   */
  export type User$digitalBusinessCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    where?: DigitalBusinessCardWhereInput
    orderBy?: DigitalBusinessCardOrderByWithRelationInput | DigitalBusinessCardOrderByWithRelationInput[]
    cursor?: DigitalBusinessCardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DigitalBusinessCardScalarFieldEnum | DigitalBusinessCardScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _avg: AdminUserAvgAggregateOutputType | null
    _sum: AdminUserSumAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminUserSumAggregateOutputType = {
    id: number | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    fullName: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    fullName: string | null
    role: string | null
    isActive: boolean | null
    lastLogin: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    fullName: number
    role: number
    isActive: number
    lastLogin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserAvgAggregateInputType = {
    id?: true
  }

  export type AdminUserSumAggregateInputType = {
    id?: true
  }

  export type AdminUserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    fullName?: true
    role?: true
    isActive?: true
    lastLogin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _avg?: AdminUserAvgAggregateInputType
    _sum?: AdminUserSumAggregateInputType
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    fullName: string
    role: string
    isActive: boolean
    lastLogin: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _avg: AdminUserAvgAggregateOutputType | null
    _sum: AdminUserSumAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    actions?: boolean | AdminUser$actionsArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>



  export type AdminUserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    fullName?: boolean
    role?: boolean
    isActive?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "fullName" | "role" | "isActive" | "lastLogin" | "createdAt" | "updatedAt", ExtArgs["result"]["adminUser"]>
  export type AdminUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    actions?: boolean | AdminUser$actionsArgs<ExtArgs>
    _count?: boolean | AdminUserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {
      actions: Prisma.$AdminActionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password: string
      fullName: string
      role: string
      isActive: boolean
      lastLogin: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    actions<T extends AdminUser$actionsArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$actionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminUser model
   */
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'Int'>
    readonly username: FieldRef<"AdminUser", 'String'>
    readonly email: FieldRef<"AdminUser", 'String'>
    readonly password: FieldRef<"AdminUser", 'String'>
    readonly fullName: FieldRef<"AdminUser", 'String'>
    readonly role: FieldRef<"AdminUser", 'String'>
    readonly isActive: FieldRef<"AdminUser", 'Boolean'>
    readonly lastLogin: FieldRef<"AdminUser", 'DateTime'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to delete.
     */
    limit?: number
  }

  /**
   * AdminUser.actions
   */
  export type AdminUser$actionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    where?: AdminActionWhereInput
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    cursor?: AdminActionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
  }


  /**
   * Model AdminAction
   */

  export type AggregateAdminAction = {
    _count: AdminActionCountAggregateOutputType | null
    _avg: AdminActionAvgAggregateOutputType | null
    _sum: AdminActionSumAggregateOutputType | null
    _min: AdminActionMinAggregateOutputType | null
    _max: AdminActionMaxAggregateOutputType | null
  }

  export type AdminActionAvgAggregateOutputType = {
    id: number | null
    adminId: number | null
    userId: number | null
  }

  export type AdminActionSumAggregateOutputType = {
    id: number | null
    adminId: number | null
    userId: number | null
  }

  export type AdminActionMinAggregateOutputType = {
    id: number | null
    adminId: number | null
    userId: number | null
    actionType: string | null
    description: string | null
    oldValue: string | null
    newValue: string | null
    createdAt: Date | null
  }

  export type AdminActionMaxAggregateOutputType = {
    id: number | null
    adminId: number | null
    userId: number | null
    actionType: string | null
    description: string | null
    oldValue: string | null
    newValue: string | null
    createdAt: Date | null
  }

  export type AdminActionCountAggregateOutputType = {
    id: number
    adminId: number
    userId: number
    actionType: number
    description: number
    oldValue: number
    newValue: number
    createdAt: number
    _all: number
  }


  export type AdminActionAvgAggregateInputType = {
    id?: true
    adminId?: true
    userId?: true
  }

  export type AdminActionSumAggregateInputType = {
    id?: true
    adminId?: true
    userId?: true
  }

  export type AdminActionMinAggregateInputType = {
    id?: true
    adminId?: true
    userId?: true
    actionType?: true
    description?: true
    oldValue?: true
    newValue?: true
    createdAt?: true
  }

  export type AdminActionMaxAggregateInputType = {
    id?: true
    adminId?: true
    userId?: true
    actionType?: true
    description?: true
    oldValue?: true
    newValue?: true
    createdAt?: true
  }

  export type AdminActionCountAggregateInputType = {
    id?: true
    adminId?: true
    userId?: true
    actionType?: true
    description?: true
    oldValue?: true
    newValue?: true
    createdAt?: true
    _all?: true
  }

  export type AdminActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminAction to aggregate.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminActions
    **/
    _count?: true | AdminActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminActionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminActionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminActionMaxAggregateInputType
  }

  export type GetAdminActionAggregateType<T extends AdminActionAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminAction[P]>
      : GetScalarType<T[P], AggregateAdminAction[P]>
  }




  export type AdminActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminActionWhereInput
    orderBy?: AdminActionOrderByWithAggregationInput | AdminActionOrderByWithAggregationInput[]
    by: AdminActionScalarFieldEnum[] | AdminActionScalarFieldEnum
    having?: AdminActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminActionCountAggregateInputType | true
    _avg?: AdminActionAvgAggregateInputType
    _sum?: AdminActionSumAggregateInputType
    _min?: AdminActionMinAggregateInputType
    _max?: AdminActionMaxAggregateInputType
  }

  export type AdminActionGroupByOutputType = {
    id: number
    adminId: number
    userId: number | null
    actionType: string
    description: string
    oldValue: string | null
    newValue: string | null
    createdAt: Date
    _count: AdminActionCountAggregateOutputType | null
    _avg: AdminActionAvgAggregateOutputType | null
    _sum: AdminActionSumAggregateOutputType | null
    _min: AdminActionMinAggregateOutputType | null
    _max: AdminActionMaxAggregateOutputType | null
  }

  type GetAdminActionGroupByPayload<T extends AdminActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminActionGroupByOutputType[P]>
            : GetScalarType<T[P], AdminActionGroupByOutputType[P]>
        }
      >
    >


  export type AdminActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    adminId?: boolean
    userId?: boolean
    actionType?: boolean
    description?: boolean
    oldValue?: boolean
    newValue?: boolean
    createdAt?: boolean
    admin?: boolean | AdminUserDefaultArgs<ExtArgs>
    user?: boolean | AdminAction$userArgs<ExtArgs>
  }, ExtArgs["result"]["adminAction"]>



  export type AdminActionSelectScalar = {
    id?: boolean
    adminId?: boolean
    userId?: boolean
    actionType?: boolean
    description?: boolean
    oldValue?: boolean
    newValue?: boolean
    createdAt?: boolean
  }

  export type AdminActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "adminId" | "userId" | "actionType" | "description" | "oldValue" | "newValue" | "createdAt", ExtArgs["result"]["adminAction"]>
  export type AdminActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminUserDefaultArgs<ExtArgs>
    user?: boolean | AdminAction$userArgs<ExtArgs>
  }

  export type $AdminActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminAction"
    objects: {
      admin: Prisma.$AdminUserPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      adminId: number
      userId: number | null
      actionType: string
      description: string
      oldValue: string | null
      newValue: string | null
      createdAt: Date
    }, ExtArgs["result"]["adminAction"]>
    composites: {}
  }

  type AdminActionGetPayload<S extends boolean | null | undefined | AdminActionDefaultArgs> = $Result.GetResult<Prisma.$AdminActionPayload, S>

  type AdminActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminActionCountAggregateInputType | true
    }

  export interface AdminActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminAction'], meta: { name: 'AdminAction' } }
    /**
     * Find zero or one AdminAction that matches the filter.
     * @param {AdminActionFindUniqueArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminActionFindUniqueArgs>(args: SelectSubset<T, AdminActionFindUniqueArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminActionFindUniqueOrThrowArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminActionFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionFindFirstArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminActionFindFirstArgs>(args?: SelectSubset<T, AdminActionFindFirstArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionFindFirstOrThrowArgs} args - Arguments to find a AdminAction
     * @example
     * // Get one AdminAction
     * const adminAction = await prisma.adminAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminActionFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminActions
     * const adminActions = await prisma.adminAction.findMany()
     * 
     * // Get first 10 AdminActions
     * const adminActions = await prisma.adminAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminActionWithIdOnly = await prisma.adminAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminActionFindManyArgs>(args?: SelectSubset<T, AdminActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminAction.
     * @param {AdminActionCreateArgs} args - Arguments to create a AdminAction.
     * @example
     * // Create one AdminAction
     * const AdminAction = await prisma.adminAction.create({
     *   data: {
     *     // ... data to create a AdminAction
     *   }
     * })
     * 
     */
    create<T extends AdminActionCreateArgs>(args: SelectSubset<T, AdminActionCreateArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminActions.
     * @param {AdminActionCreateManyArgs} args - Arguments to create many AdminActions.
     * @example
     * // Create many AdminActions
     * const adminAction = await prisma.adminAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminActionCreateManyArgs>(args?: SelectSubset<T, AdminActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a AdminAction.
     * @param {AdminActionDeleteArgs} args - Arguments to delete one AdminAction.
     * @example
     * // Delete one AdminAction
     * const AdminAction = await prisma.adminAction.delete({
     *   where: {
     *     // ... filter to delete one AdminAction
     *   }
     * })
     * 
     */
    delete<T extends AdminActionDeleteArgs>(args: SelectSubset<T, AdminActionDeleteArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminAction.
     * @param {AdminActionUpdateArgs} args - Arguments to update one AdminAction.
     * @example
     * // Update one AdminAction
     * const adminAction = await prisma.adminAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminActionUpdateArgs>(args: SelectSubset<T, AdminActionUpdateArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminActions.
     * @param {AdminActionDeleteManyArgs} args - Arguments to filter AdminActions to delete.
     * @example
     * // Delete a few AdminActions
     * const { count } = await prisma.adminAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminActionDeleteManyArgs>(args?: SelectSubset<T, AdminActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminActions
     * const adminAction = await prisma.adminAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminActionUpdateManyArgs>(args: SelectSubset<T, AdminActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminAction.
     * @param {AdminActionUpsertArgs} args - Arguments to update or create a AdminAction.
     * @example
     * // Update or create a AdminAction
     * const adminAction = await prisma.adminAction.upsert({
     *   create: {
     *     // ... data to create a AdminAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminAction we want to update
     *   }
     * })
     */
    upsert<T extends AdminActionUpsertArgs>(args: SelectSubset<T, AdminActionUpsertArgs<ExtArgs>>): Prisma__AdminActionClient<$Result.GetResult<Prisma.$AdminActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionCountArgs} args - Arguments to filter AdminActions to count.
     * @example
     * // Count the number of AdminActions
     * const count = await prisma.adminAction.count({
     *   where: {
     *     // ... the filter for the AdminActions we want to count
     *   }
     * })
    **/
    count<T extends AdminActionCountArgs>(
      args?: Subset<T, AdminActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminActionAggregateArgs>(args: Subset<T, AdminActionAggregateArgs>): Prisma.PrismaPromise<GetAdminActionAggregateType<T>>

    /**
     * Group by AdminAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminActionGroupByArgs['orderBy'] }
        : { orderBy?: AdminActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminAction model
   */
  readonly fields: AdminActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends AdminUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminUserDefaultArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends AdminAction$userArgs<ExtArgs> = {}>(args?: Subset<T, AdminAction$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminAction model
   */
  interface AdminActionFieldRefs {
    readonly id: FieldRef<"AdminAction", 'Int'>
    readonly adminId: FieldRef<"AdminAction", 'Int'>
    readonly userId: FieldRef<"AdminAction", 'Int'>
    readonly actionType: FieldRef<"AdminAction", 'String'>
    readonly description: FieldRef<"AdminAction", 'String'>
    readonly oldValue: FieldRef<"AdminAction", 'String'>
    readonly newValue: FieldRef<"AdminAction", 'String'>
    readonly createdAt: FieldRef<"AdminAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminAction findUnique
   */
  export type AdminActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction findUniqueOrThrow
   */
  export type AdminActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction findFirst
   */
  export type AdminActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminActions.
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminActions.
     */
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * AdminAction findFirstOrThrow
   */
  export type AdminActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * Filter, which AdminAction to fetch.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminActions.
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminActions.
     */
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * AdminAction findMany
   */
  export type AdminActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * Filter, which AdminActions to fetch.
     */
    where?: AdminActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminActions to fetch.
     */
    orderBy?: AdminActionOrderByWithRelationInput | AdminActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminActions.
     */
    cursor?: AdminActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminActions.
     */
    skip?: number
    distinct?: AdminActionScalarFieldEnum | AdminActionScalarFieldEnum[]
  }

  /**
   * AdminAction create
   */
  export type AdminActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminAction.
     */
    data: XOR<AdminActionCreateInput, AdminActionUncheckedCreateInput>
  }

  /**
   * AdminAction createMany
   */
  export type AdminActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminActions.
     */
    data: AdminActionCreateManyInput | AdminActionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminAction update
   */
  export type AdminActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminAction.
     */
    data: XOR<AdminActionUpdateInput, AdminActionUncheckedUpdateInput>
    /**
     * Choose, which AdminAction to update.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction updateMany
   */
  export type AdminActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminActions.
     */
    data: XOR<AdminActionUpdateManyMutationInput, AdminActionUncheckedUpdateManyInput>
    /**
     * Filter which AdminActions to update
     */
    where?: AdminActionWhereInput
    /**
     * Limit how many AdminActions to update.
     */
    limit?: number
  }

  /**
   * AdminAction upsert
   */
  export type AdminActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminAction to update in case it exists.
     */
    where: AdminActionWhereUniqueInput
    /**
     * In case the AdminAction found by the `where` argument doesn't exist, create a new AdminAction with this data.
     */
    create: XOR<AdminActionCreateInput, AdminActionUncheckedCreateInput>
    /**
     * In case the AdminAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminActionUpdateInput, AdminActionUncheckedUpdateInput>
  }

  /**
   * AdminAction delete
   */
  export type AdminActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
    /**
     * Filter which AdminAction to delete.
     */
    where: AdminActionWhereUniqueInput
  }

  /**
   * AdminAction deleteMany
   */
  export type AdminActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminActions to delete
     */
    where?: AdminActionWhereInput
    /**
     * Limit how many AdminActions to delete.
     */
    limit?: number
  }

  /**
   * AdminAction.user
   */
  export type AdminAction$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AdminAction without action
   */
  export type AdminActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminAction
     */
    select?: AdminActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminAction
     */
    omit?: AdminActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminActionInclude<ExtArgs> | null
  }


  /**
   * Model QRCode
   */

  export type AggregateQRCode = {
    _count: QRCodeCountAggregateOutputType | null
    _avg: QRCodeAvgAggregateOutputType | null
    _sum: QRCodeSumAggregateOutputType | null
    _min: QRCodeMinAggregateOutputType | null
    _max: QRCodeMaxAggregateOutputType | null
  }

  export type QRCodeAvgAggregateOutputType = {
    id: number | null
    updateCount: number | null
    userId: number | null
    download_count: number | null
  }

  export type QRCodeSumAggregateOutputType = {
    id: number | null
    updateCount: number | null
    userId: number | null
    download_count: number | null
  }

  export type QRCodeMinAggregateOutputType = {
    id: number | null
    lastLink: string | null
    uniqueCode: string | null
    cornerShape: string | null
    eyeShape: string | null
    qrShape: string | null
    foregroundColor: string | null
    backgroundColor: string | null
    dotColor: string | null
    cornerColor: string | null
    eyeColor: string | null
    updateCount: number | null
    qrCodeImagePath: string | null
    logoPath: string | null
    frameStyle: string | null
    frameText: string | null
    frameTextSize: string | null
    frameColor: string | null
    frameTextColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    qrStatus: boolean | null
    download_count: number | null
  }

  export type QRCodeMaxAggregateOutputType = {
    id: number | null
    lastLink: string | null
    uniqueCode: string | null
    cornerShape: string | null
    eyeShape: string | null
    qrShape: string | null
    foregroundColor: string | null
    backgroundColor: string | null
    dotColor: string | null
    cornerColor: string | null
    eyeColor: string | null
    updateCount: number | null
    qrCodeImagePath: string | null
    logoPath: string | null
    frameStyle: string | null
    frameText: string | null
    frameTextSize: string | null
    frameColor: string | null
    frameTextColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
    qrStatus: boolean | null
    download_count: number | null
  }

  export type QRCodeCountAggregateOutputType = {
    id: number
    qrData: number
    lastLink: number
    uniqueCode: number
    cornerShape: number
    eyeShape: number
    qrShape: number
    foregroundColor: number
    backgroundColor: number
    dotColor: number
    cornerColor: number
    eyeColor: number
    updateCount: number
    qrCodeImagePath: number
    logoPath: number
    frameStyle: number
    frameText: number
    frameTextSize: number
    frameColor: number
    frameTextColor: number
    createdAt: number
    updatedAt: number
    userId: number
    qrStatus: number
    download_count: number
    _all: number
  }


  export type QRCodeAvgAggregateInputType = {
    id?: true
    updateCount?: true
    userId?: true
    download_count?: true
  }

  export type QRCodeSumAggregateInputType = {
    id?: true
    updateCount?: true
    userId?: true
    download_count?: true
  }

  export type QRCodeMinAggregateInputType = {
    id?: true
    lastLink?: true
    uniqueCode?: true
    cornerShape?: true
    eyeShape?: true
    qrShape?: true
    foregroundColor?: true
    backgroundColor?: true
    dotColor?: true
    cornerColor?: true
    eyeColor?: true
    updateCount?: true
    qrCodeImagePath?: true
    logoPath?: true
    frameStyle?: true
    frameText?: true
    frameTextSize?: true
    frameColor?: true
    frameTextColor?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    qrStatus?: true
    download_count?: true
  }

  export type QRCodeMaxAggregateInputType = {
    id?: true
    lastLink?: true
    uniqueCode?: true
    cornerShape?: true
    eyeShape?: true
    qrShape?: true
    foregroundColor?: true
    backgroundColor?: true
    dotColor?: true
    cornerColor?: true
    eyeColor?: true
    updateCount?: true
    qrCodeImagePath?: true
    logoPath?: true
    frameStyle?: true
    frameText?: true
    frameTextSize?: true
    frameColor?: true
    frameTextColor?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    qrStatus?: true
    download_count?: true
  }

  export type QRCodeCountAggregateInputType = {
    id?: true
    qrData?: true
    lastLink?: true
    uniqueCode?: true
    cornerShape?: true
    eyeShape?: true
    qrShape?: true
    foregroundColor?: true
    backgroundColor?: true
    dotColor?: true
    cornerColor?: true
    eyeColor?: true
    updateCount?: true
    qrCodeImagePath?: true
    logoPath?: true
    frameStyle?: true
    frameText?: true
    frameTextSize?: true
    frameColor?: true
    frameTextColor?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    qrStatus?: true
    download_count?: true
    _all?: true
  }

  export type QRCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRCode to aggregate.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QRCodes
    **/
    _count?: true | QRCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QRCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QRCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QRCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QRCodeMaxAggregateInputType
  }

  export type GetQRCodeAggregateType<T extends QRCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateQRCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQRCode[P]>
      : GetScalarType<T[P], AggregateQRCode[P]>
  }




  export type QRCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QRCodeWhereInput
    orderBy?: QRCodeOrderByWithAggregationInput | QRCodeOrderByWithAggregationInput[]
    by: QRCodeScalarFieldEnum[] | QRCodeScalarFieldEnum
    having?: QRCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QRCodeCountAggregateInputType | true
    _avg?: QRCodeAvgAggregateInputType
    _sum?: QRCodeSumAggregateInputType
    _min?: QRCodeMinAggregateInputType
    _max?: QRCodeMaxAggregateInputType
  }

  export type QRCodeGroupByOutputType = {
    id: number
    qrData: JsonValue
    lastLink: string | null
    uniqueCode: string
    cornerShape: string
    eyeShape: string
    qrShape: string
    foregroundColor: string
    backgroundColor: string
    dotColor: string | null
    cornerColor: string | null
    eyeColor: string | null
    updateCount: number
    qrCodeImagePath: string | null
    logoPath: string | null
    frameStyle: string | null
    frameText: string | null
    frameTextSize: string | null
    frameColor: string | null
    frameTextColor: string | null
    createdAt: Date
    updatedAt: Date
    userId: number | null
    qrStatus: boolean
    download_count: number
    _count: QRCodeCountAggregateOutputType | null
    _avg: QRCodeAvgAggregateOutputType | null
    _sum: QRCodeSumAggregateOutputType | null
    _min: QRCodeMinAggregateOutputType | null
    _max: QRCodeMaxAggregateOutputType | null
  }

  type GetQRCodeGroupByPayload<T extends QRCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QRCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QRCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QRCodeGroupByOutputType[P]>
            : GetScalarType<T[P], QRCodeGroupByOutputType[P]>
        }
      >
    >


  export type QRCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qrData?: boolean
    lastLink?: boolean
    uniqueCode?: boolean
    cornerShape?: boolean
    eyeShape?: boolean
    qrShape?: boolean
    foregroundColor?: boolean
    backgroundColor?: boolean
    dotColor?: boolean
    cornerColor?: boolean
    eyeColor?: boolean
    updateCount?: boolean
    qrCodeImagePath?: boolean
    logoPath?: boolean
    frameStyle?: boolean
    frameText?: boolean
    frameTextSize?: boolean
    frameColor?: boolean
    frameTextColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    qrStatus?: boolean
    download_count?: boolean
    user?: boolean | QRCode$userArgs<ExtArgs>
    scanLogs?: boolean | QRCode$scanLogsArgs<ExtArgs>
    downloadLogs?: boolean | QRCode$downloadLogsArgs<ExtArgs>
    digitalBusinessCard?: boolean | QRCode$digitalBusinessCardArgs<ExtArgs>
    _count?: boolean | QRCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qRCode"]>



  export type QRCodeSelectScalar = {
    id?: boolean
    qrData?: boolean
    lastLink?: boolean
    uniqueCode?: boolean
    cornerShape?: boolean
    eyeShape?: boolean
    qrShape?: boolean
    foregroundColor?: boolean
    backgroundColor?: boolean
    dotColor?: boolean
    cornerColor?: boolean
    eyeColor?: boolean
    updateCount?: boolean
    qrCodeImagePath?: boolean
    logoPath?: boolean
    frameStyle?: boolean
    frameText?: boolean
    frameTextSize?: boolean
    frameColor?: boolean
    frameTextColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    qrStatus?: boolean
    download_count?: boolean
  }

  export type QRCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "qrData" | "lastLink" | "uniqueCode" | "cornerShape" | "eyeShape" | "qrShape" | "foregroundColor" | "backgroundColor" | "dotColor" | "cornerColor" | "eyeColor" | "updateCount" | "qrCodeImagePath" | "logoPath" | "frameStyle" | "frameText" | "frameTextSize" | "frameColor" | "frameTextColor" | "createdAt" | "updatedAt" | "userId" | "qrStatus" | "download_count", ExtArgs["result"]["qRCode"]>
  export type QRCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | QRCode$userArgs<ExtArgs>
    scanLogs?: boolean | QRCode$scanLogsArgs<ExtArgs>
    downloadLogs?: boolean | QRCode$downloadLogsArgs<ExtArgs>
    digitalBusinessCard?: boolean | QRCode$digitalBusinessCardArgs<ExtArgs>
    _count?: boolean | QRCodeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $QRCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QRCode"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      scanLogs: Prisma.$ScanLogPayload<ExtArgs>[]
      downloadLogs: Prisma.$DownloadLogPayload<ExtArgs>[]
      digitalBusinessCard: Prisma.$DigitalBusinessCardPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      qrData: Prisma.JsonValue
      lastLink: string | null
      uniqueCode: string
      cornerShape: string
      eyeShape: string
      qrShape: string
      foregroundColor: string
      backgroundColor: string
      dotColor: string | null
      cornerColor: string | null
      eyeColor: string | null
      updateCount: number
      qrCodeImagePath: string | null
      logoPath: string | null
      frameStyle: string | null
      frameText: string | null
      frameTextSize: string | null
      frameColor: string | null
      frameTextColor: string | null
      createdAt: Date
      updatedAt: Date
      userId: number | null
      qrStatus: boolean
      download_count: number
    }, ExtArgs["result"]["qRCode"]>
    composites: {}
  }

  type QRCodeGetPayload<S extends boolean | null | undefined | QRCodeDefaultArgs> = $Result.GetResult<Prisma.$QRCodePayload, S>

  type QRCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QRCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QRCodeCountAggregateInputType | true
    }

  export interface QRCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QRCode'], meta: { name: 'QRCode' } }
    /**
     * Find zero or one QRCode that matches the filter.
     * @param {QRCodeFindUniqueArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QRCodeFindUniqueArgs>(args: SelectSubset<T, QRCodeFindUniqueArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QRCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QRCodeFindUniqueOrThrowArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QRCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, QRCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeFindFirstArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QRCodeFindFirstArgs>(args?: SelectSubset<T, QRCodeFindFirstArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QRCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeFindFirstOrThrowArgs} args - Arguments to find a QRCode
     * @example
     * // Get one QRCode
     * const qRCode = await prisma.qRCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QRCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, QRCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QRCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QRCodes
     * const qRCodes = await prisma.qRCode.findMany()
     * 
     * // Get first 10 QRCodes
     * const qRCodes = await prisma.qRCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qRCodeWithIdOnly = await prisma.qRCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QRCodeFindManyArgs>(args?: SelectSubset<T, QRCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QRCode.
     * @param {QRCodeCreateArgs} args - Arguments to create a QRCode.
     * @example
     * // Create one QRCode
     * const QRCode = await prisma.qRCode.create({
     *   data: {
     *     // ... data to create a QRCode
     *   }
     * })
     * 
     */
    create<T extends QRCodeCreateArgs>(args: SelectSubset<T, QRCodeCreateArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QRCodes.
     * @param {QRCodeCreateManyArgs} args - Arguments to create many QRCodes.
     * @example
     * // Create many QRCodes
     * const qRCode = await prisma.qRCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QRCodeCreateManyArgs>(args?: SelectSubset<T, QRCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a QRCode.
     * @param {QRCodeDeleteArgs} args - Arguments to delete one QRCode.
     * @example
     * // Delete one QRCode
     * const QRCode = await prisma.qRCode.delete({
     *   where: {
     *     // ... filter to delete one QRCode
     *   }
     * })
     * 
     */
    delete<T extends QRCodeDeleteArgs>(args: SelectSubset<T, QRCodeDeleteArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QRCode.
     * @param {QRCodeUpdateArgs} args - Arguments to update one QRCode.
     * @example
     * // Update one QRCode
     * const qRCode = await prisma.qRCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QRCodeUpdateArgs>(args: SelectSubset<T, QRCodeUpdateArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QRCodes.
     * @param {QRCodeDeleteManyArgs} args - Arguments to filter QRCodes to delete.
     * @example
     * // Delete a few QRCodes
     * const { count } = await prisma.qRCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QRCodeDeleteManyArgs>(args?: SelectSubset<T, QRCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QRCodes
     * const qRCode = await prisma.qRCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QRCodeUpdateManyArgs>(args: SelectSubset<T, QRCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QRCode.
     * @param {QRCodeUpsertArgs} args - Arguments to update or create a QRCode.
     * @example
     * // Update or create a QRCode
     * const qRCode = await prisma.qRCode.upsert({
     *   create: {
     *     // ... data to create a QRCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QRCode we want to update
     *   }
     * })
     */
    upsert<T extends QRCodeUpsertArgs>(args: SelectSubset<T, QRCodeUpsertArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QRCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeCountArgs} args - Arguments to filter QRCodes to count.
     * @example
     * // Count the number of QRCodes
     * const count = await prisma.qRCode.count({
     *   where: {
     *     // ... the filter for the QRCodes we want to count
     *   }
     * })
    **/
    count<T extends QRCodeCountArgs>(
      args?: Subset<T, QRCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QRCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QRCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QRCodeAggregateArgs>(args: Subset<T, QRCodeAggregateArgs>): Prisma.PrismaPromise<GetQRCodeAggregateType<T>>

    /**
     * Group by QRCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QRCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QRCodeGroupByArgs['orderBy'] }
        : { orderBy?: QRCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QRCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQRCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QRCode model
   */
  readonly fields: QRCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QRCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QRCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends QRCode$userArgs<ExtArgs> = {}>(args?: Subset<T, QRCode$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    scanLogs<T extends QRCode$scanLogsArgs<ExtArgs> = {}>(args?: Subset<T, QRCode$scanLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    downloadLogs<T extends QRCode$downloadLogsArgs<ExtArgs> = {}>(args?: Subset<T, QRCode$downloadLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    digitalBusinessCard<T extends QRCode$digitalBusinessCardArgs<ExtArgs> = {}>(args?: Subset<T, QRCode$digitalBusinessCardArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QRCode model
   */
  interface QRCodeFieldRefs {
    readonly id: FieldRef<"QRCode", 'Int'>
    readonly qrData: FieldRef<"QRCode", 'Json'>
    readonly lastLink: FieldRef<"QRCode", 'String'>
    readonly uniqueCode: FieldRef<"QRCode", 'String'>
    readonly cornerShape: FieldRef<"QRCode", 'String'>
    readonly eyeShape: FieldRef<"QRCode", 'String'>
    readonly qrShape: FieldRef<"QRCode", 'String'>
    readonly foregroundColor: FieldRef<"QRCode", 'String'>
    readonly backgroundColor: FieldRef<"QRCode", 'String'>
    readonly dotColor: FieldRef<"QRCode", 'String'>
    readonly cornerColor: FieldRef<"QRCode", 'String'>
    readonly eyeColor: FieldRef<"QRCode", 'String'>
    readonly updateCount: FieldRef<"QRCode", 'Int'>
    readonly qrCodeImagePath: FieldRef<"QRCode", 'String'>
    readonly logoPath: FieldRef<"QRCode", 'String'>
    readonly frameStyle: FieldRef<"QRCode", 'String'>
    readonly frameText: FieldRef<"QRCode", 'String'>
    readonly frameTextSize: FieldRef<"QRCode", 'String'>
    readonly frameColor: FieldRef<"QRCode", 'String'>
    readonly frameTextColor: FieldRef<"QRCode", 'String'>
    readonly createdAt: FieldRef<"QRCode", 'DateTime'>
    readonly updatedAt: FieldRef<"QRCode", 'DateTime'>
    readonly userId: FieldRef<"QRCode", 'Int'>
    readonly qrStatus: FieldRef<"QRCode", 'Boolean'>
    readonly download_count: FieldRef<"QRCode", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * QRCode findUnique
   */
  export type QRCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode findUniqueOrThrow
   */
  export type QRCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode findFirst
   */
  export type QRCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRCodes.
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRCodes.
     */
    distinct?: QRCodeScalarFieldEnum | QRCodeScalarFieldEnum[]
  }

  /**
   * QRCode findFirstOrThrow
   */
  export type QRCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * Filter, which QRCode to fetch.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRCodes.
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRCodes.
     */
    distinct?: QRCodeScalarFieldEnum | QRCodeScalarFieldEnum[]
  }

  /**
   * QRCode findMany
   */
  export type QRCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * Filter, which QRCodes to fetch.
     */
    where?: QRCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRCodes to fetch.
     */
    orderBy?: QRCodeOrderByWithRelationInput | QRCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QRCodes.
     */
    cursor?: QRCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRCodes.
     */
    skip?: number
    distinct?: QRCodeScalarFieldEnum | QRCodeScalarFieldEnum[]
  }

  /**
   * QRCode create
   */
  export type QRCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a QRCode.
     */
    data: XOR<QRCodeCreateInput, QRCodeUncheckedCreateInput>
  }

  /**
   * QRCode createMany
   */
  export type QRCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QRCodes.
     */
    data: QRCodeCreateManyInput | QRCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRCode update
   */
  export type QRCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a QRCode.
     */
    data: XOR<QRCodeUpdateInput, QRCodeUncheckedUpdateInput>
    /**
     * Choose, which QRCode to update.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode updateMany
   */
  export type QRCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QRCodes.
     */
    data: XOR<QRCodeUpdateManyMutationInput, QRCodeUncheckedUpdateManyInput>
    /**
     * Filter which QRCodes to update
     */
    where?: QRCodeWhereInput
    /**
     * Limit how many QRCodes to update.
     */
    limit?: number
  }

  /**
   * QRCode upsert
   */
  export type QRCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the QRCode to update in case it exists.
     */
    where: QRCodeWhereUniqueInput
    /**
     * In case the QRCode found by the `where` argument doesn't exist, create a new QRCode with this data.
     */
    create: XOR<QRCodeCreateInput, QRCodeUncheckedCreateInput>
    /**
     * In case the QRCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QRCodeUpdateInput, QRCodeUncheckedUpdateInput>
  }

  /**
   * QRCode delete
   */
  export type QRCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
    /**
     * Filter which QRCode to delete.
     */
    where: QRCodeWhereUniqueInput
  }

  /**
   * QRCode deleteMany
   */
  export type QRCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRCodes to delete
     */
    where?: QRCodeWhereInput
    /**
     * Limit how many QRCodes to delete.
     */
    limit?: number
  }

  /**
   * QRCode.user
   */
  export type QRCode$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * QRCode.scanLogs
   */
  export type QRCode$scanLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    where?: ScanLogWhereInput
    orderBy?: ScanLogOrderByWithRelationInput | ScanLogOrderByWithRelationInput[]
    cursor?: ScanLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScanLogScalarFieldEnum | ScanLogScalarFieldEnum[]
  }

  /**
   * QRCode.downloadLogs
   */
  export type QRCode$downloadLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    where?: DownloadLogWhereInput
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    cursor?: DownloadLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * QRCode.digitalBusinessCard
   */
  export type QRCode$digitalBusinessCardArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    where?: DigitalBusinessCardWhereInput
  }

  /**
   * QRCode without action
   */
  export type QRCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRCode
     */
    select?: QRCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QRCode
     */
    omit?: QRCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QRCodeInclude<ExtArgs> | null
  }


  /**
   * Model ScanLog
   */

  export type AggregateScanLog = {
    _count: ScanLogCountAggregateOutputType | null
    _avg: ScanLogAvgAggregateOutputType | null
    _sum: ScanLogSumAggregateOutputType | null
    _min: ScanLogMinAggregateOutputType | null
    _max: ScanLogMaxAggregateOutputType | null
  }

  export type ScanLogAvgAggregateOutputType = {
    scanqr_id: number | null
    qr_code_id: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type ScanLogSumAggregateOutputType = {
    scanqr_id: number | null
    qr_code_id: number | null
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type ScanLogMinAggregateOutputType = {
    scanqr_id: number | null
    qr_code_id: number | null
    scanned_at: Date | null
    ip_address: string | null
    country: string | null
    region: string | null
    city: string | null
    isp: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    device_type: string | null
    os_name: string | null
    browser_name: string | null
  }

  export type ScanLogMaxAggregateOutputType = {
    scanqr_id: number | null
    qr_code_id: number | null
    scanned_at: Date | null
    ip_address: string | null
    country: string | null
    region: string | null
    city: string | null
    isp: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    device_type: string | null
    os_name: string | null
    browser_name: string | null
  }

  export type ScanLogCountAggregateOutputType = {
    scanqr_id: number
    qr_code_id: number
    scanned_at: number
    ip_address: number
    country: number
    region: number
    city: number
    isp: number
    latitude: number
    longitude: number
    device_type: number
    os_name: number
    browser_name: number
    _all: number
  }


  export type ScanLogAvgAggregateInputType = {
    scanqr_id?: true
    qr_code_id?: true
    latitude?: true
    longitude?: true
  }

  export type ScanLogSumAggregateInputType = {
    scanqr_id?: true
    qr_code_id?: true
    latitude?: true
    longitude?: true
  }

  export type ScanLogMinAggregateInputType = {
    scanqr_id?: true
    qr_code_id?: true
    scanned_at?: true
    ip_address?: true
    country?: true
    region?: true
    city?: true
    isp?: true
    latitude?: true
    longitude?: true
    device_type?: true
    os_name?: true
    browser_name?: true
  }

  export type ScanLogMaxAggregateInputType = {
    scanqr_id?: true
    qr_code_id?: true
    scanned_at?: true
    ip_address?: true
    country?: true
    region?: true
    city?: true
    isp?: true
    latitude?: true
    longitude?: true
    device_type?: true
    os_name?: true
    browser_name?: true
  }

  export type ScanLogCountAggregateInputType = {
    scanqr_id?: true
    qr_code_id?: true
    scanned_at?: true
    ip_address?: true
    country?: true
    region?: true
    city?: true
    isp?: true
    latitude?: true
    longitude?: true
    device_type?: true
    os_name?: true
    browser_name?: true
    _all?: true
  }

  export type ScanLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanLog to aggregate.
     */
    where?: ScanLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanLogs to fetch.
     */
    orderBy?: ScanLogOrderByWithRelationInput | ScanLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScanLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScanLogs
    **/
    _count?: true | ScanLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScanLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScanLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScanLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScanLogMaxAggregateInputType
  }

  export type GetScanLogAggregateType<T extends ScanLogAggregateArgs> = {
        [P in keyof T & keyof AggregateScanLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScanLog[P]>
      : GetScalarType<T[P], AggregateScanLog[P]>
  }




  export type ScanLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScanLogWhereInput
    orderBy?: ScanLogOrderByWithAggregationInput | ScanLogOrderByWithAggregationInput[]
    by: ScanLogScalarFieldEnum[] | ScanLogScalarFieldEnum
    having?: ScanLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScanLogCountAggregateInputType | true
    _avg?: ScanLogAvgAggregateInputType
    _sum?: ScanLogSumAggregateInputType
    _min?: ScanLogMinAggregateInputType
    _max?: ScanLogMaxAggregateInputType
  }

  export type ScanLogGroupByOutputType = {
    scanqr_id: number
    qr_code_id: number
    scanned_at: Date
    ip_address: string | null
    country: string | null
    region: string | null
    city: string | null
    isp: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    device_type: string | null
    os_name: string | null
    browser_name: string | null
    _count: ScanLogCountAggregateOutputType | null
    _avg: ScanLogAvgAggregateOutputType | null
    _sum: ScanLogSumAggregateOutputType | null
    _min: ScanLogMinAggregateOutputType | null
    _max: ScanLogMaxAggregateOutputType | null
  }

  type GetScanLogGroupByPayload<T extends ScanLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScanLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScanLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScanLogGroupByOutputType[P]>
            : GetScalarType<T[P], ScanLogGroupByOutputType[P]>
        }
      >
    >


  export type ScanLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    scanqr_id?: boolean
    qr_code_id?: boolean
    scanned_at?: boolean
    ip_address?: boolean
    country?: boolean
    region?: boolean
    city?: boolean
    isp?: boolean
    latitude?: boolean
    longitude?: boolean
    device_type?: boolean
    os_name?: boolean
    browser_name?: boolean
    QRCode?: boolean | QRCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scanLog"]>



  export type ScanLogSelectScalar = {
    scanqr_id?: boolean
    qr_code_id?: boolean
    scanned_at?: boolean
    ip_address?: boolean
    country?: boolean
    region?: boolean
    city?: boolean
    isp?: boolean
    latitude?: boolean
    longitude?: boolean
    device_type?: boolean
    os_name?: boolean
    browser_name?: boolean
  }

  export type ScanLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"scanqr_id" | "qr_code_id" | "scanned_at" | "ip_address" | "country" | "region" | "city" | "isp" | "latitude" | "longitude" | "device_type" | "os_name" | "browser_name", ExtArgs["result"]["scanLog"]>
  export type ScanLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    QRCode?: boolean | QRCodeDefaultArgs<ExtArgs>
  }

  export type $ScanLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScanLog"
    objects: {
      QRCode: Prisma.$QRCodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      scanqr_id: number
      qr_code_id: number
      scanned_at: Date
      ip_address: string | null
      country: string | null
      region: string | null
      city: string | null
      isp: string | null
      latitude: Prisma.Decimal | null
      longitude: Prisma.Decimal | null
      device_type: string | null
      os_name: string | null
      browser_name: string | null
    }, ExtArgs["result"]["scanLog"]>
    composites: {}
  }

  type ScanLogGetPayload<S extends boolean | null | undefined | ScanLogDefaultArgs> = $Result.GetResult<Prisma.$ScanLogPayload, S>

  type ScanLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScanLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScanLogCountAggregateInputType | true
    }

  export interface ScanLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScanLog'], meta: { name: 'ScanLog' } }
    /**
     * Find zero or one ScanLog that matches the filter.
     * @param {ScanLogFindUniqueArgs} args - Arguments to find a ScanLog
     * @example
     * // Get one ScanLog
     * const scanLog = await prisma.scanLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScanLogFindUniqueArgs>(args: SelectSubset<T, ScanLogFindUniqueArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScanLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScanLogFindUniqueOrThrowArgs} args - Arguments to find a ScanLog
     * @example
     * // Get one ScanLog
     * const scanLog = await prisma.scanLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScanLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ScanLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanLogFindFirstArgs} args - Arguments to find a ScanLog
     * @example
     * // Get one ScanLog
     * const scanLog = await prisma.scanLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScanLogFindFirstArgs>(args?: SelectSubset<T, ScanLogFindFirstArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScanLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanLogFindFirstOrThrowArgs} args - Arguments to find a ScanLog
     * @example
     * // Get one ScanLog
     * const scanLog = await prisma.scanLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScanLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ScanLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScanLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScanLogs
     * const scanLogs = await prisma.scanLog.findMany()
     * 
     * // Get first 10 ScanLogs
     * const scanLogs = await prisma.scanLog.findMany({ take: 10 })
     * 
     * // Only select the `scanqr_id`
     * const scanLogWithScanqr_idOnly = await prisma.scanLog.findMany({ select: { scanqr_id: true } })
     * 
     */
    findMany<T extends ScanLogFindManyArgs>(args?: SelectSubset<T, ScanLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScanLog.
     * @param {ScanLogCreateArgs} args - Arguments to create a ScanLog.
     * @example
     * // Create one ScanLog
     * const ScanLog = await prisma.scanLog.create({
     *   data: {
     *     // ... data to create a ScanLog
     *   }
     * })
     * 
     */
    create<T extends ScanLogCreateArgs>(args: SelectSubset<T, ScanLogCreateArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScanLogs.
     * @param {ScanLogCreateManyArgs} args - Arguments to create many ScanLogs.
     * @example
     * // Create many ScanLogs
     * const scanLog = await prisma.scanLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScanLogCreateManyArgs>(args?: SelectSubset<T, ScanLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ScanLog.
     * @param {ScanLogDeleteArgs} args - Arguments to delete one ScanLog.
     * @example
     * // Delete one ScanLog
     * const ScanLog = await prisma.scanLog.delete({
     *   where: {
     *     // ... filter to delete one ScanLog
     *   }
     * })
     * 
     */
    delete<T extends ScanLogDeleteArgs>(args: SelectSubset<T, ScanLogDeleteArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScanLog.
     * @param {ScanLogUpdateArgs} args - Arguments to update one ScanLog.
     * @example
     * // Update one ScanLog
     * const scanLog = await prisma.scanLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScanLogUpdateArgs>(args: SelectSubset<T, ScanLogUpdateArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScanLogs.
     * @param {ScanLogDeleteManyArgs} args - Arguments to filter ScanLogs to delete.
     * @example
     * // Delete a few ScanLogs
     * const { count } = await prisma.scanLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScanLogDeleteManyArgs>(args?: SelectSubset<T, ScanLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScanLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScanLogs
     * const scanLog = await prisma.scanLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScanLogUpdateManyArgs>(args: SelectSubset<T, ScanLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ScanLog.
     * @param {ScanLogUpsertArgs} args - Arguments to update or create a ScanLog.
     * @example
     * // Update or create a ScanLog
     * const scanLog = await prisma.scanLog.upsert({
     *   create: {
     *     // ... data to create a ScanLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScanLog we want to update
     *   }
     * })
     */
    upsert<T extends ScanLogUpsertArgs>(args: SelectSubset<T, ScanLogUpsertArgs<ExtArgs>>): Prisma__ScanLogClient<$Result.GetResult<Prisma.$ScanLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScanLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanLogCountArgs} args - Arguments to filter ScanLogs to count.
     * @example
     * // Count the number of ScanLogs
     * const count = await prisma.scanLog.count({
     *   where: {
     *     // ... the filter for the ScanLogs we want to count
     *   }
     * })
    **/
    count<T extends ScanLogCountArgs>(
      args?: Subset<T, ScanLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScanLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScanLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScanLogAggregateArgs>(args: Subset<T, ScanLogAggregateArgs>): Prisma.PrismaPromise<GetScanLogAggregateType<T>>

    /**
     * Group by ScanLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScanLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScanLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScanLogGroupByArgs['orderBy'] }
        : { orderBy?: ScanLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScanLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScanLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScanLog model
   */
  readonly fields: ScanLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScanLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScanLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    QRCode<T extends QRCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QRCodeDefaultArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScanLog model
   */
  interface ScanLogFieldRefs {
    readonly scanqr_id: FieldRef<"ScanLog", 'Int'>
    readonly qr_code_id: FieldRef<"ScanLog", 'Int'>
    readonly scanned_at: FieldRef<"ScanLog", 'DateTime'>
    readonly ip_address: FieldRef<"ScanLog", 'String'>
    readonly country: FieldRef<"ScanLog", 'String'>
    readonly region: FieldRef<"ScanLog", 'String'>
    readonly city: FieldRef<"ScanLog", 'String'>
    readonly isp: FieldRef<"ScanLog", 'String'>
    readonly latitude: FieldRef<"ScanLog", 'Decimal'>
    readonly longitude: FieldRef<"ScanLog", 'Decimal'>
    readonly device_type: FieldRef<"ScanLog", 'String'>
    readonly os_name: FieldRef<"ScanLog", 'String'>
    readonly browser_name: FieldRef<"ScanLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ScanLog findUnique
   */
  export type ScanLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * Filter, which ScanLog to fetch.
     */
    where: ScanLogWhereUniqueInput
  }

  /**
   * ScanLog findUniqueOrThrow
   */
  export type ScanLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * Filter, which ScanLog to fetch.
     */
    where: ScanLogWhereUniqueInput
  }

  /**
   * ScanLog findFirst
   */
  export type ScanLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * Filter, which ScanLog to fetch.
     */
    where?: ScanLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanLogs to fetch.
     */
    orderBy?: ScanLogOrderByWithRelationInput | ScanLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanLogs.
     */
    cursor?: ScanLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanLogs.
     */
    distinct?: ScanLogScalarFieldEnum | ScanLogScalarFieldEnum[]
  }

  /**
   * ScanLog findFirstOrThrow
   */
  export type ScanLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * Filter, which ScanLog to fetch.
     */
    where?: ScanLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanLogs to fetch.
     */
    orderBy?: ScanLogOrderByWithRelationInput | ScanLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScanLogs.
     */
    cursor?: ScanLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScanLogs.
     */
    distinct?: ScanLogScalarFieldEnum | ScanLogScalarFieldEnum[]
  }

  /**
   * ScanLog findMany
   */
  export type ScanLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * Filter, which ScanLogs to fetch.
     */
    where?: ScanLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScanLogs to fetch.
     */
    orderBy?: ScanLogOrderByWithRelationInput | ScanLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScanLogs.
     */
    cursor?: ScanLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScanLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScanLogs.
     */
    skip?: number
    distinct?: ScanLogScalarFieldEnum | ScanLogScalarFieldEnum[]
  }

  /**
   * ScanLog create
   */
  export type ScanLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ScanLog.
     */
    data: XOR<ScanLogCreateInput, ScanLogUncheckedCreateInput>
  }

  /**
   * ScanLog createMany
   */
  export type ScanLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScanLogs.
     */
    data: ScanLogCreateManyInput | ScanLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScanLog update
   */
  export type ScanLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ScanLog.
     */
    data: XOR<ScanLogUpdateInput, ScanLogUncheckedUpdateInput>
    /**
     * Choose, which ScanLog to update.
     */
    where: ScanLogWhereUniqueInput
  }

  /**
   * ScanLog updateMany
   */
  export type ScanLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScanLogs.
     */
    data: XOR<ScanLogUpdateManyMutationInput, ScanLogUncheckedUpdateManyInput>
    /**
     * Filter which ScanLogs to update
     */
    where?: ScanLogWhereInput
    /**
     * Limit how many ScanLogs to update.
     */
    limit?: number
  }

  /**
   * ScanLog upsert
   */
  export type ScanLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ScanLog to update in case it exists.
     */
    where: ScanLogWhereUniqueInput
    /**
     * In case the ScanLog found by the `where` argument doesn't exist, create a new ScanLog with this data.
     */
    create: XOR<ScanLogCreateInput, ScanLogUncheckedCreateInput>
    /**
     * In case the ScanLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScanLogUpdateInput, ScanLogUncheckedUpdateInput>
  }

  /**
   * ScanLog delete
   */
  export type ScanLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
    /**
     * Filter which ScanLog to delete.
     */
    where: ScanLogWhereUniqueInput
  }

  /**
   * ScanLog deleteMany
   */
  export type ScanLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScanLogs to delete
     */
    where?: ScanLogWhereInput
    /**
     * Limit how many ScanLogs to delete.
     */
    limit?: number
  }

  /**
   * ScanLog without action
   */
  export type ScanLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScanLog
     */
    select?: ScanLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScanLog
     */
    omit?: ScanLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScanLogInclude<ExtArgs> | null
  }


  /**
   * Model DownloadLog
   */

  export type AggregateDownloadLog = {
    _count: DownloadLogCountAggregateOutputType | null
    _avg: DownloadLogAvgAggregateOutputType | null
    _sum: DownloadLogSumAggregateOutputType | null
    _min: DownloadLogMinAggregateOutputType | null
    _max: DownloadLogMaxAggregateOutputType | null
  }

  export type DownloadLogAvgAggregateOutputType = {
    id: number | null
    qr_code_id: number | null
  }

  export type DownloadLogSumAggregateOutputType = {
    id: number | null
    qr_code_id: number | null
  }

  export type DownloadLogMinAggregateOutputType = {
    id: number | null
    qr_code_id: number | null
    downloaded_at: Date | null
  }

  export type DownloadLogMaxAggregateOutputType = {
    id: number | null
    qr_code_id: number | null
    downloaded_at: Date | null
  }

  export type DownloadLogCountAggregateOutputType = {
    id: number
    qr_code_id: number
    downloaded_at: number
    _all: number
  }


  export type DownloadLogAvgAggregateInputType = {
    id?: true
    qr_code_id?: true
  }

  export type DownloadLogSumAggregateInputType = {
    id?: true
    qr_code_id?: true
  }

  export type DownloadLogMinAggregateInputType = {
    id?: true
    qr_code_id?: true
    downloaded_at?: true
  }

  export type DownloadLogMaxAggregateInputType = {
    id?: true
    qr_code_id?: true
    downloaded_at?: true
  }

  export type DownloadLogCountAggregateInputType = {
    id?: true
    qr_code_id?: true
    downloaded_at?: true
    _all?: true
  }

  export type DownloadLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DownloadLog to aggregate.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DownloadLogs
    **/
    _count?: true | DownloadLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DownloadLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DownloadLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DownloadLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DownloadLogMaxAggregateInputType
  }

  export type GetDownloadLogAggregateType<T extends DownloadLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDownloadLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDownloadLog[P]>
      : GetScalarType<T[P], AggregateDownloadLog[P]>
  }




  export type DownloadLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DownloadLogWhereInput
    orderBy?: DownloadLogOrderByWithAggregationInput | DownloadLogOrderByWithAggregationInput[]
    by: DownloadLogScalarFieldEnum[] | DownloadLogScalarFieldEnum
    having?: DownloadLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DownloadLogCountAggregateInputType | true
    _avg?: DownloadLogAvgAggregateInputType
    _sum?: DownloadLogSumAggregateInputType
    _min?: DownloadLogMinAggregateInputType
    _max?: DownloadLogMaxAggregateInputType
  }

  export type DownloadLogGroupByOutputType = {
    id: number
    qr_code_id: number
    downloaded_at: Date
    _count: DownloadLogCountAggregateOutputType | null
    _avg: DownloadLogAvgAggregateOutputType | null
    _sum: DownloadLogSumAggregateOutputType | null
    _min: DownloadLogMinAggregateOutputType | null
    _max: DownloadLogMaxAggregateOutputType | null
  }

  type GetDownloadLogGroupByPayload<T extends DownloadLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DownloadLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DownloadLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DownloadLogGroupByOutputType[P]>
            : GetScalarType<T[P], DownloadLogGroupByOutputType[P]>
        }
      >
    >


  export type DownloadLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    qr_code_id?: boolean
    downloaded_at?: boolean
    QRCode?: boolean | QRCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["downloadLog"]>



  export type DownloadLogSelectScalar = {
    id?: boolean
    qr_code_id?: boolean
    downloaded_at?: boolean
  }

  export type DownloadLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "qr_code_id" | "downloaded_at", ExtArgs["result"]["downloadLog"]>
  export type DownloadLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    QRCode?: boolean | QRCodeDefaultArgs<ExtArgs>
  }

  export type $DownloadLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DownloadLog"
    objects: {
      QRCode: Prisma.$QRCodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      qr_code_id: number
      downloaded_at: Date
    }, ExtArgs["result"]["downloadLog"]>
    composites: {}
  }

  type DownloadLogGetPayload<S extends boolean | null | undefined | DownloadLogDefaultArgs> = $Result.GetResult<Prisma.$DownloadLogPayload, S>

  type DownloadLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DownloadLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DownloadLogCountAggregateInputType | true
    }

  export interface DownloadLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DownloadLog'], meta: { name: 'DownloadLog' } }
    /**
     * Find zero or one DownloadLog that matches the filter.
     * @param {DownloadLogFindUniqueArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DownloadLogFindUniqueArgs>(args: SelectSubset<T, DownloadLogFindUniqueArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DownloadLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DownloadLogFindUniqueOrThrowArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DownloadLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DownloadLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DownloadLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogFindFirstArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DownloadLogFindFirstArgs>(args?: SelectSubset<T, DownloadLogFindFirstArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DownloadLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogFindFirstOrThrowArgs} args - Arguments to find a DownloadLog
     * @example
     * // Get one DownloadLog
     * const downloadLog = await prisma.downloadLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DownloadLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DownloadLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DownloadLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DownloadLogs
     * const downloadLogs = await prisma.downloadLog.findMany()
     * 
     * // Get first 10 DownloadLogs
     * const downloadLogs = await prisma.downloadLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const downloadLogWithIdOnly = await prisma.downloadLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DownloadLogFindManyArgs>(args?: SelectSubset<T, DownloadLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DownloadLog.
     * @param {DownloadLogCreateArgs} args - Arguments to create a DownloadLog.
     * @example
     * // Create one DownloadLog
     * const DownloadLog = await prisma.downloadLog.create({
     *   data: {
     *     // ... data to create a DownloadLog
     *   }
     * })
     * 
     */
    create<T extends DownloadLogCreateArgs>(args: SelectSubset<T, DownloadLogCreateArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DownloadLogs.
     * @param {DownloadLogCreateManyArgs} args - Arguments to create many DownloadLogs.
     * @example
     * // Create many DownloadLogs
     * const downloadLog = await prisma.downloadLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DownloadLogCreateManyArgs>(args?: SelectSubset<T, DownloadLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DownloadLog.
     * @param {DownloadLogDeleteArgs} args - Arguments to delete one DownloadLog.
     * @example
     * // Delete one DownloadLog
     * const DownloadLog = await prisma.downloadLog.delete({
     *   where: {
     *     // ... filter to delete one DownloadLog
     *   }
     * })
     * 
     */
    delete<T extends DownloadLogDeleteArgs>(args: SelectSubset<T, DownloadLogDeleteArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DownloadLog.
     * @param {DownloadLogUpdateArgs} args - Arguments to update one DownloadLog.
     * @example
     * // Update one DownloadLog
     * const downloadLog = await prisma.downloadLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DownloadLogUpdateArgs>(args: SelectSubset<T, DownloadLogUpdateArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DownloadLogs.
     * @param {DownloadLogDeleteManyArgs} args - Arguments to filter DownloadLogs to delete.
     * @example
     * // Delete a few DownloadLogs
     * const { count } = await prisma.downloadLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DownloadLogDeleteManyArgs>(args?: SelectSubset<T, DownloadLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DownloadLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DownloadLogs
     * const downloadLog = await prisma.downloadLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DownloadLogUpdateManyArgs>(args: SelectSubset<T, DownloadLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DownloadLog.
     * @param {DownloadLogUpsertArgs} args - Arguments to update or create a DownloadLog.
     * @example
     * // Update or create a DownloadLog
     * const downloadLog = await prisma.downloadLog.upsert({
     *   create: {
     *     // ... data to create a DownloadLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DownloadLog we want to update
     *   }
     * })
     */
    upsert<T extends DownloadLogUpsertArgs>(args: SelectSubset<T, DownloadLogUpsertArgs<ExtArgs>>): Prisma__DownloadLogClient<$Result.GetResult<Prisma.$DownloadLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DownloadLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogCountArgs} args - Arguments to filter DownloadLogs to count.
     * @example
     * // Count the number of DownloadLogs
     * const count = await prisma.downloadLog.count({
     *   where: {
     *     // ... the filter for the DownloadLogs we want to count
     *   }
     * })
    **/
    count<T extends DownloadLogCountArgs>(
      args?: Subset<T, DownloadLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DownloadLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DownloadLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DownloadLogAggregateArgs>(args: Subset<T, DownloadLogAggregateArgs>): Prisma.PrismaPromise<GetDownloadLogAggregateType<T>>

    /**
     * Group by DownloadLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DownloadLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DownloadLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DownloadLogGroupByArgs['orderBy'] }
        : { orderBy?: DownloadLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DownloadLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDownloadLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DownloadLog model
   */
  readonly fields: DownloadLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DownloadLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DownloadLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    QRCode<T extends QRCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QRCodeDefaultArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DownloadLog model
   */
  interface DownloadLogFieldRefs {
    readonly id: FieldRef<"DownloadLog", 'Int'>
    readonly qr_code_id: FieldRef<"DownloadLog", 'Int'>
    readonly downloaded_at: FieldRef<"DownloadLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DownloadLog findUnique
   */
  export type DownloadLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog findUniqueOrThrow
   */
  export type DownloadLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog findFirst
   */
  export type DownloadLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DownloadLogs.
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DownloadLogs.
     */
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * DownloadLog findFirstOrThrow
   */
  export type DownloadLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLog to fetch.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DownloadLogs.
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DownloadLogs.
     */
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * DownloadLog findMany
   */
  export type DownloadLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter, which DownloadLogs to fetch.
     */
    where?: DownloadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DownloadLogs to fetch.
     */
    orderBy?: DownloadLogOrderByWithRelationInput | DownloadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DownloadLogs.
     */
    cursor?: DownloadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DownloadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DownloadLogs.
     */
    skip?: number
    distinct?: DownloadLogScalarFieldEnum | DownloadLogScalarFieldEnum[]
  }

  /**
   * DownloadLog create
   */
  export type DownloadLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * The data needed to create a DownloadLog.
     */
    data: XOR<DownloadLogCreateInput, DownloadLogUncheckedCreateInput>
  }

  /**
   * DownloadLog createMany
   */
  export type DownloadLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DownloadLogs.
     */
    data: DownloadLogCreateManyInput | DownloadLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DownloadLog update
   */
  export type DownloadLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * The data needed to update a DownloadLog.
     */
    data: XOR<DownloadLogUpdateInput, DownloadLogUncheckedUpdateInput>
    /**
     * Choose, which DownloadLog to update.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog updateMany
   */
  export type DownloadLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DownloadLogs.
     */
    data: XOR<DownloadLogUpdateManyMutationInput, DownloadLogUncheckedUpdateManyInput>
    /**
     * Filter which DownloadLogs to update
     */
    where?: DownloadLogWhereInput
    /**
     * Limit how many DownloadLogs to update.
     */
    limit?: number
  }

  /**
   * DownloadLog upsert
   */
  export type DownloadLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * The filter to search for the DownloadLog to update in case it exists.
     */
    where: DownloadLogWhereUniqueInput
    /**
     * In case the DownloadLog found by the `where` argument doesn't exist, create a new DownloadLog with this data.
     */
    create: XOR<DownloadLogCreateInput, DownloadLogUncheckedCreateInput>
    /**
     * In case the DownloadLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DownloadLogUpdateInput, DownloadLogUncheckedUpdateInput>
  }

  /**
   * DownloadLog delete
   */
  export type DownloadLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
    /**
     * Filter which DownloadLog to delete.
     */
    where: DownloadLogWhereUniqueInput
  }

  /**
   * DownloadLog deleteMany
   */
  export type DownloadLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DownloadLogs to delete
     */
    where?: DownloadLogWhereInput
    /**
     * Limit how many DownloadLogs to delete.
     */
    limit?: number
  }

  /**
   * DownloadLog without action
   */
  export type DownloadLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DownloadLog
     */
    select?: DownloadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DownloadLog
     */
    omit?: DownloadLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DownloadLogInclude<ExtArgs> | null
  }


  /**
   * Model ProfileUpdateLog
   */

  export type AggregateProfileUpdateLog = {
    _count: ProfileUpdateLogCountAggregateOutputType | null
    _avg: ProfileUpdateLogAvgAggregateOutputType | null
    _sum: ProfileUpdateLogSumAggregateOutputType | null
    _min: ProfileUpdateLogMinAggregateOutputType | null
    _max: ProfileUpdateLogMaxAggregateOutputType | null
  }

  export type ProfileUpdateLogAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type ProfileUpdateLogSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type ProfileUpdateLogMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    updated_at: Date | null
  }

  export type ProfileUpdateLogMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    updated_at: Date | null
  }

  export type ProfileUpdateLogCountAggregateOutputType = {
    id: number
    user_id: number
    updated_at: number
    _all: number
  }


  export type ProfileUpdateLogAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type ProfileUpdateLogSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type ProfileUpdateLogMinAggregateInputType = {
    id?: true
    user_id?: true
    updated_at?: true
  }

  export type ProfileUpdateLogMaxAggregateInputType = {
    id?: true
    user_id?: true
    updated_at?: true
  }

  export type ProfileUpdateLogCountAggregateInputType = {
    id?: true
    user_id?: true
    updated_at?: true
    _all?: true
  }

  export type ProfileUpdateLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileUpdateLog to aggregate.
     */
    where?: ProfileUpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileUpdateLogs to fetch.
     */
    orderBy?: ProfileUpdateLogOrderByWithRelationInput | ProfileUpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfileUpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileUpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileUpdateLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfileUpdateLogs
    **/
    _count?: true | ProfileUpdateLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileUpdateLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileUpdateLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileUpdateLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileUpdateLogMaxAggregateInputType
  }

  export type GetProfileUpdateLogAggregateType<T extends ProfileUpdateLogAggregateArgs> = {
        [P in keyof T & keyof AggregateProfileUpdateLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfileUpdateLog[P]>
      : GetScalarType<T[P], AggregateProfileUpdateLog[P]>
  }




  export type ProfileUpdateLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfileUpdateLogWhereInput
    orderBy?: ProfileUpdateLogOrderByWithAggregationInput | ProfileUpdateLogOrderByWithAggregationInput[]
    by: ProfileUpdateLogScalarFieldEnum[] | ProfileUpdateLogScalarFieldEnum
    having?: ProfileUpdateLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileUpdateLogCountAggregateInputType | true
    _avg?: ProfileUpdateLogAvgAggregateInputType
    _sum?: ProfileUpdateLogSumAggregateInputType
    _min?: ProfileUpdateLogMinAggregateInputType
    _max?: ProfileUpdateLogMaxAggregateInputType
  }

  export type ProfileUpdateLogGroupByOutputType = {
    id: number
    user_id: number
    updated_at: Date
    _count: ProfileUpdateLogCountAggregateOutputType | null
    _avg: ProfileUpdateLogAvgAggregateOutputType | null
    _sum: ProfileUpdateLogSumAggregateOutputType | null
    _min: ProfileUpdateLogMinAggregateOutputType | null
    _max: ProfileUpdateLogMaxAggregateOutputType | null
  }

  type GetProfileUpdateLogGroupByPayload<T extends ProfileUpdateLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfileUpdateLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileUpdateLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileUpdateLogGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileUpdateLogGroupByOutputType[P]>
        }
      >
    >


  export type ProfileUpdateLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    updated_at?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["profileUpdateLog"]>



  export type ProfileUpdateLogSelectScalar = {
    id?: boolean
    user_id?: boolean
    updated_at?: boolean
  }

  export type ProfileUpdateLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "updated_at", ExtArgs["result"]["profileUpdateLog"]>
  export type ProfileUpdateLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProfileUpdateLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfileUpdateLog"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      updated_at: Date
    }, ExtArgs["result"]["profileUpdateLog"]>
    composites: {}
  }

  type ProfileUpdateLogGetPayload<S extends boolean | null | undefined | ProfileUpdateLogDefaultArgs> = $Result.GetResult<Prisma.$ProfileUpdateLogPayload, S>

  type ProfileUpdateLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfileUpdateLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfileUpdateLogCountAggregateInputType | true
    }

  export interface ProfileUpdateLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfileUpdateLog'], meta: { name: 'ProfileUpdateLog' } }
    /**
     * Find zero or one ProfileUpdateLog that matches the filter.
     * @param {ProfileUpdateLogFindUniqueArgs} args - Arguments to find a ProfileUpdateLog
     * @example
     * // Get one ProfileUpdateLog
     * const profileUpdateLog = await prisma.profileUpdateLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfileUpdateLogFindUniqueArgs>(args: SelectSubset<T, ProfileUpdateLogFindUniqueArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfileUpdateLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfileUpdateLogFindUniqueOrThrowArgs} args - Arguments to find a ProfileUpdateLog
     * @example
     * // Get one ProfileUpdateLog
     * const profileUpdateLog = await prisma.profileUpdateLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfileUpdateLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfileUpdateLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileUpdateLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateLogFindFirstArgs} args - Arguments to find a ProfileUpdateLog
     * @example
     * // Get one ProfileUpdateLog
     * const profileUpdateLog = await prisma.profileUpdateLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfileUpdateLogFindFirstArgs>(args?: SelectSubset<T, ProfileUpdateLogFindFirstArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfileUpdateLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateLogFindFirstOrThrowArgs} args - Arguments to find a ProfileUpdateLog
     * @example
     * // Get one ProfileUpdateLog
     * const profileUpdateLog = await prisma.profileUpdateLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfileUpdateLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfileUpdateLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfileUpdateLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfileUpdateLogs
     * const profileUpdateLogs = await prisma.profileUpdateLog.findMany()
     * 
     * // Get first 10 ProfileUpdateLogs
     * const profileUpdateLogs = await prisma.profileUpdateLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileUpdateLogWithIdOnly = await prisma.profileUpdateLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfileUpdateLogFindManyArgs>(args?: SelectSubset<T, ProfileUpdateLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfileUpdateLog.
     * @param {ProfileUpdateLogCreateArgs} args - Arguments to create a ProfileUpdateLog.
     * @example
     * // Create one ProfileUpdateLog
     * const ProfileUpdateLog = await prisma.profileUpdateLog.create({
     *   data: {
     *     // ... data to create a ProfileUpdateLog
     *   }
     * })
     * 
     */
    create<T extends ProfileUpdateLogCreateArgs>(args: SelectSubset<T, ProfileUpdateLogCreateArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfileUpdateLogs.
     * @param {ProfileUpdateLogCreateManyArgs} args - Arguments to create many ProfileUpdateLogs.
     * @example
     * // Create many ProfileUpdateLogs
     * const profileUpdateLog = await prisma.profileUpdateLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfileUpdateLogCreateManyArgs>(args?: SelectSubset<T, ProfileUpdateLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProfileUpdateLog.
     * @param {ProfileUpdateLogDeleteArgs} args - Arguments to delete one ProfileUpdateLog.
     * @example
     * // Delete one ProfileUpdateLog
     * const ProfileUpdateLog = await prisma.profileUpdateLog.delete({
     *   where: {
     *     // ... filter to delete one ProfileUpdateLog
     *   }
     * })
     * 
     */
    delete<T extends ProfileUpdateLogDeleteArgs>(args: SelectSubset<T, ProfileUpdateLogDeleteArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfileUpdateLog.
     * @param {ProfileUpdateLogUpdateArgs} args - Arguments to update one ProfileUpdateLog.
     * @example
     * // Update one ProfileUpdateLog
     * const profileUpdateLog = await prisma.profileUpdateLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfileUpdateLogUpdateArgs>(args: SelectSubset<T, ProfileUpdateLogUpdateArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfileUpdateLogs.
     * @param {ProfileUpdateLogDeleteManyArgs} args - Arguments to filter ProfileUpdateLogs to delete.
     * @example
     * // Delete a few ProfileUpdateLogs
     * const { count } = await prisma.profileUpdateLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfileUpdateLogDeleteManyArgs>(args?: SelectSubset<T, ProfileUpdateLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfileUpdateLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfileUpdateLogs
     * const profileUpdateLog = await prisma.profileUpdateLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfileUpdateLogUpdateManyArgs>(args: SelectSubset<T, ProfileUpdateLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProfileUpdateLog.
     * @param {ProfileUpdateLogUpsertArgs} args - Arguments to update or create a ProfileUpdateLog.
     * @example
     * // Update or create a ProfileUpdateLog
     * const profileUpdateLog = await prisma.profileUpdateLog.upsert({
     *   create: {
     *     // ... data to create a ProfileUpdateLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfileUpdateLog we want to update
     *   }
     * })
     */
    upsert<T extends ProfileUpdateLogUpsertArgs>(args: SelectSubset<T, ProfileUpdateLogUpsertArgs<ExtArgs>>): Prisma__ProfileUpdateLogClient<$Result.GetResult<Prisma.$ProfileUpdateLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfileUpdateLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateLogCountArgs} args - Arguments to filter ProfileUpdateLogs to count.
     * @example
     * // Count the number of ProfileUpdateLogs
     * const count = await prisma.profileUpdateLog.count({
     *   where: {
     *     // ... the filter for the ProfileUpdateLogs we want to count
     *   }
     * })
    **/
    count<T extends ProfileUpdateLogCountArgs>(
      args?: Subset<T, ProfileUpdateLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileUpdateLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfileUpdateLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileUpdateLogAggregateArgs>(args: Subset<T, ProfileUpdateLogAggregateArgs>): Prisma.PrismaPromise<GetProfileUpdateLogAggregateType<T>>

    /**
     * Group by ProfileUpdateLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileUpdateLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileUpdateLogGroupByArgs['orderBy'] }
        : { orderBy?: ProfileUpdateLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileUpdateLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileUpdateLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfileUpdateLog model
   */
  readonly fields: ProfileUpdateLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfileUpdateLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfileUpdateLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfileUpdateLog model
   */
  interface ProfileUpdateLogFieldRefs {
    readonly id: FieldRef<"ProfileUpdateLog", 'Int'>
    readonly user_id: FieldRef<"ProfileUpdateLog", 'Int'>
    readonly updated_at: FieldRef<"ProfileUpdateLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProfileUpdateLog findUnique
   */
  export type ProfileUpdateLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * Filter, which ProfileUpdateLog to fetch.
     */
    where: ProfileUpdateLogWhereUniqueInput
  }

  /**
   * ProfileUpdateLog findUniqueOrThrow
   */
  export type ProfileUpdateLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * Filter, which ProfileUpdateLog to fetch.
     */
    where: ProfileUpdateLogWhereUniqueInput
  }

  /**
   * ProfileUpdateLog findFirst
   */
  export type ProfileUpdateLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * Filter, which ProfileUpdateLog to fetch.
     */
    where?: ProfileUpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileUpdateLogs to fetch.
     */
    orderBy?: ProfileUpdateLogOrderByWithRelationInput | ProfileUpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileUpdateLogs.
     */
    cursor?: ProfileUpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileUpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileUpdateLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileUpdateLogs.
     */
    distinct?: ProfileUpdateLogScalarFieldEnum | ProfileUpdateLogScalarFieldEnum[]
  }

  /**
   * ProfileUpdateLog findFirstOrThrow
   */
  export type ProfileUpdateLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * Filter, which ProfileUpdateLog to fetch.
     */
    where?: ProfileUpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileUpdateLogs to fetch.
     */
    orderBy?: ProfileUpdateLogOrderByWithRelationInput | ProfileUpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfileUpdateLogs.
     */
    cursor?: ProfileUpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileUpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileUpdateLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfileUpdateLogs.
     */
    distinct?: ProfileUpdateLogScalarFieldEnum | ProfileUpdateLogScalarFieldEnum[]
  }

  /**
   * ProfileUpdateLog findMany
   */
  export type ProfileUpdateLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * Filter, which ProfileUpdateLogs to fetch.
     */
    where?: ProfileUpdateLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfileUpdateLogs to fetch.
     */
    orderBy?: ProfileUpdateLogOrderByWithRelationInput | ProfileUpdateLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfileUpdateLogs.
     */
    cursor?: ProfileUpdateLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfileUpdateLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfileUpdateLogs.
     */
    skip?: number
    distinct?: ProfileUpdateLogScalarFieldEnum | ProfileUpdateLogScalarFieldEnum[]
  }

  /**
   * ProfileUpdateLog create
   */
  export type ProfileUpdateLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfileUpdateLog.
     */
    data: XOR<ProfileUpdateLogCreateInput, ProfileUpdateLogUncheckedCreateInput>
  }

  /**
   * ProfileUpdateLog createMany
   */
  export type ProfileUpdateLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfileUpdateLogs.
     */
    data: ProfileUpdateLogCreateManyInput | ProfileUpdateLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfileUpdateLog update
   */
  export type ProfileUpdateLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfileUpdateLog.
     */
    data: XOR<ProfileUpdateLogUpdateInput, ProfileUpdateLogUncheckedUpdateInput>
    /**
     * Choose, which ProfileUpdateLog to update.
     */
    where: ProfileUpdateLogWhereUniqueInput
  }

  /**
   * ProfileUpdateLog updateMany
   */
  export type ProfileUpdateLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfileUpdateLogs.
     */
    data: XOR<ProfileUpdateLogUpdateManyMutationInput, ProfileUpdateLogUncheckedUpdateManyInput>
    /**
     * Filter which ProfileUpdateLogs to update
     */
    where?: ProfileUpdateLogWhereInput
    /**
     * Limit how many ProfileUpdateLogs to update.
     */
    limit?: number
  }

  /**
   * ProfileUpdateLog upsert
   */
  export type ProfileUpdateLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfileUpdateLog to update in case it exists.
     */
    where: ProfileUpdateLogWhereUniqueInput
    /**
     * In case the ProfileUpdateLog found by the `where` argument doesn't exist, create a new ProfileUpdateLog with this data.
     */
    create: XOR<ProfileUpdateLogCreateInput, ProfileUpdateLogUncheckedCreateInput>
    /**
     * In case the ProfileUpdateLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfileUpdateLogUpdateInput, ProfileUpdateLogUncheckedUpdateInput>
  }

  /**
   * ProfileUpdateLog delete
   */
  export type ProfileUpdateLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
    /**
     * Filter which ProfileUpdateLog to delete.
     */
    where: ProfileUpdateLogWhereUniqueInput
  }

  /**
   * ProfileUpdateLog deleteMany
   */
  export type ProfileUpdateLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfileUpdateLogs to delete
     */
    where?: ProfileUpdateLogWhereInput
    /**
     * Limit how many ProfileUpdateLogs to delete.
     */
    limit?: number
  }

  /**
   * ProfileUpdateLog without action
   */
  export type ProfileUpdateLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfileUpdateLog
     */
    select?: ProfileUpdateLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfileUpdateLog
     */
    omit?: ProfileUpdateLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfileUpdateLogInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionAvgAggregateOutputType = {
    id: number | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
  }

  export type SubscriptionSumAggregateOutputType = {
    id: number | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
    features: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
    features: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionAvgAggregateInputType = {
    id?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
  }

  export type SubscriptionSumAggregateInputType = {
    id?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
  }

  export type SubscriptionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
    features?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
    features?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
    features?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _avg?: SubscriptionAvgAggregateInputType
    _sum?: SubscriptionSumAggregateInputType
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _avg: SubscriptionAvgAggregateOutputType | null
    _sum: SubscriptionSumAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    qrCodesLimit?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Subscription$usersArgs<ExtArgs>
    payments?: boolean | Subscription$paymentsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>



  export type SubscriptionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    qrCodesLimit?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "priceMonthly" | "priceYearly" | "qrCodesLimit" | "features" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Subscription$usersArgs<ExtArgs>
    payments?: boolean | Subscription$paymentsArgs<ExtArgs>
    _count?: boolean | SubscriptionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      priceMonthly: number
      priceYearly: number
      qrCodesLimit: number
      features: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Subscription$usersArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Subscription$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Subscription$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'Int'>
    readonly name: FieldRef<"Subscription", 'String'>
    readonly description: FieldRef<"Subscription", 'String'>
    readonly priceMonthly: FieldRef<"Subscription", 'Int'>
    readonly priceYearly: FieldRef<"Subscription", 'Int'>
    readonly qrCodesLimit: FieldRef<"Subscription", 'Int'>
    readonly features: FieldRef<"Subscription", 'String'>
    readonly isActive: FieldRef<"Subscription", 'Boolean'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription.users
   */
  export type Subscription$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Subscription.payments
   */
  export type Subscription$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model PricingPlan
   */

  export type AggregatePricingPlan = {
    _count: PricingPlanCountAggregateOutputType | null
    _avg: PricingPlanAvgAggregateOutputType | null
    _sum: PricingPlanSumAggregateOutputType | null
    _min: PricingPlanMinAggregateOutputType | null
    _max: PricingPlanMaxAggregateOutputType | null
  }

  export type PricingPlanAvgAggregateOutputType = {
    id: number | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
  }

  export type PricingPlanSumAggregateOutputType = {
    id: number | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
  }

  export type PricingPlanMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
    features: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PricingPlanMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    priceMonthly: number | null
    priceYearly: number | null
    qrCodesLimit: number | null
    features: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PricingPlanCountAggregateOutputType = {
    id: number
    name: number
    description: number
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PricingPlanAvgAggregateInputType = {
    id?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
  }

  export type PricingPlanSumAggregateInputType = {
    id?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
  }

  export type PricingPlanMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
    features?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PricingPlanMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
    features?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PricingPlanCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    priceMonthly?: true
    priceYearly?: true
    qrCodesLimit?: true
    features?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PricingPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingPlan to aggregate.
     */
    where?: PricingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingPlans to fetch.
     */
    orderBy?: PricingPlanOrderByWithRelationInput | PricingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PricingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PricingPlans
    **/
    _count?: true | PricingPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PricingPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PricingPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PricingPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PricingPlanMaxAggregateInputType
  }

  export type GetPricingPlanAggregateType<T extends PricingPlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePricingPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePricingPlan[P]>
      : GetScalarType<T[P], AggregatePricingPlan[P]>
  }




  export type PricingPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PricingPlanWhereInput
    orderBy?: PricingPlanOrderByWithAggregationInput | PricingPlanOrderByWithAggregationInput[]
    by: PricingPlanScalarFieldEnum[] | PricingPlanScalarFieldEnum
    having?: PricingPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PricingPlanCountAggregateInputType | true
    _avg?: PricingPlanAvgAggregateInputType
    _sum?: PricingPlanSumAggregateInputType
    _min?: PricingPlanMinAggregateInputType
    _max?: PricingPlanMaxAggregateInputType
  }

  export type PricingPlanGroupByOutputType = {
    id: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PricingPlanCountAggregateOutputType | null
    _avg: PricingPlanAvgAggregateOutputType | null
    _sum: PricingPlanSumAggregateOutputType | null
    _min: PricingPlanMinAggregateOutputType | null
    _max: PricingPlanMaxAggregateOutputType | null
  }

  type GetPricingPlanGroupByPayload<T extends PricingPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PricingPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PricingPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PricingPlanGroupByOutputType[P]>
            : GetScalarType<T[P], PricingPlanGroupByOutputType[P]>
        }
      >
    >


  export type PricingPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    qrCodesLimit?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pricingPlan"]>



  export type PricingPlanSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    priceMonthly?: boolean
    priceYearly?: boolean
    qrCodesLimit?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PricingPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "priceMonthly" | "priceYearly" | "qrCodesLimit" | "features" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["pricingPlan"]>

  export type $PricingPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PricingPlan"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      priceMonthly: number
      priceYearly: number
      qrCodesLimit: number
      features: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pricingPlan"]>
    composites: {}
  }

  type PricingPlanGetPayload<S extends boolean | null | undefined | PricingPlanDefaultArgs> = $Result.GetResult<Prisma.$PricingPlanPayload, S>

  type PricingPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PricingPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PricingPlanCountAggregateInputType | true
    }

  export interface PricingPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PricingPlan'], meta: { name: 'PricingPlan' } }
    /**
     * Find zero or one PricingPlan that matches the filter.
     * @param {PricingPlanFindUniqueArgs} args - Arguments to find a PricingPlan
     * @example
     * // Get one PricingPlan
     * const pricingPlan = await prisma.pricingPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PricingPlanFindUniqueArgs>(args: SelectSubset<T, PricingPlanFindUniqueArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PricingPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PricingPlanFindUniqueOrThrowArgs} args - Arguments to find a PricingPlan
     * @example
     * // Get one PricingPlan
     * const pricingPlan = await prisma.pricingPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PricingPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PricingPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PricingPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingPlanFindFirstArgs} args - Arguments to find a PricingPlan
     * @example
     * // Get one PricingPlan
     * const pricingPlan = await prisma.pricingPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PricingPlanFindFirstArgs>(args?: SelectSubset<T, PricingPlanFindFirstArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PricingPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingPlanFindFirstOrThrowArgs} args - Arguments to find a PricingPlan
     * @example
     * // Get one PricingPlan
     * const pricingPlan = await prisma.pricingPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PricingPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PricingPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PricingPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PricingPlans
     * const pricingPlans = await prisma.pricingPlan.findMany()
     * 
     * // Get first 10 PricingPlans
     * const pricingPlans = await prisma.pricingPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pricingPlanWithIdOnly = await prisma.pricingPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PricingPlanFindManyArgs>(args?: SelectSubset<T, PricingPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PricingPlan.
     * @param {PricingPlanCreateArgs} args - Arguments to create a PricingPlan.
     * @example
     * // Create one PricingPlan
     * const PricingPlan = await prisma.pricingPlan.create({
     *   data: {
     *     // ... data to create a PricingPlan
     *   }
     * })
     * 
     */
    create<T extends PricingPlanCreateArgs>(args: SelectSubset<T, PricingPlanCreateArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PricingPlans.
     * @param {PricingPlanCreateManyArgs} args - Arguments to create many PricingPlans.
     * @example
     * // Create many PricingPlans
     * const pricingPlan = await prisma.pricingPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PricingPlanCreateManyArgs>(args?: SelectSubset<T, PricingPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PricingPlan.
     * @param {PricingPlanDeleteArgs} args - Arguments to delete one PricingPlan.
     * @example
     * // Delete one PricingPlan
     * const PricingPlan = await prisma.pricingPlan.delete({
     *   where: {
     *     // ... filter to delete one PricingPlan
     *   }
     * })
     * 
     */
    delete<T extends PricingPlanDeleteArgs>(args: SelectSubset<T, PricingPlanDeleteArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PricingPlan.
     * @param {PricingPlanUpdateArgs} args - Arguments to update one PricingPlan.
     * @example
     * // Update one PricingPlan
     * const pricingPlan = await prisma.pricingPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PricingPlanUpdateArgs>(args: SelectSubset<T, PricingPlanUpdateArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PricingPlans.
     * @param {PricingPlanDeleteManyArgs} args - Arguments to filter PricingPlans to delete.
     * @example
     * // Delete a few PricingPlans
     * const { count } = await prisma.pricingPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PricingPlanDeleteManyArgs>(args?: SelectSubset<T, PricingPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PricingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PricingPlans
     * const pricingPlan = await prisma.pricingPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PricingPlanUpdateManyArgs>(args: SelectSubset<T, PricingPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PricingPlan.
     * @param {PricingPlanUpsertArgs} args - Arguments to update or create a PricingPlan.
     * @example
     * // Update or create a PricingPlan
     * const pricingPlan = await prisma.pricingPlan.upsert({
     *   create: {
     *     // ... data to create a PricingPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PricingPlan we want to update
     *   }
     * })
     */
    upsert<T extends PricingPlanUpsertArgs>(args: SelectSubset<T, PricingPlanUpsertArgs<ExtArgs>>): Prisma__PricingPlanClient<$Result.GetResult<Prisma.$PricingPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PricingPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingPlanCountArgs} args - Arguments to filter PricingPlans to count.
     * @example
     * // Count the number of PricingPlans
     * const count = await prisma.pricingPlan.count({
     *   where: {
     *     // ... the filter for the PricingPlans we want to count
     *   }
     * })
    **/
    count<T extends PricingPlanCountArgs>(
      args?: Subset<T, PricingPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PricingPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PricingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PricingPlanAggregateArgs>(args: Subset<T, PricingPlanAggregateArgs>): Prisma.PrismaPromise<GetPricingPlanAggregateType<T>>

    /**
     * Group by PricingPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PricingPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PricingPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PricingPlanGroupByArgs['orderBy'] }
        : { orderBy?: PricingPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PricingPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PricingPlan model
   */
  readonly fields: PricingPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PricingPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PricingPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PricingPlan model
   */
  interface PricingPlanFieldRefs {
    readonly id: FieldRef<"PricingPlan", 'Int'>
    readonly name: FieldRef<"PricingPlan", 'String'>
    readonly description: FieldRef<"PricingPlan", 'String'>
    readonly priceMonthly: FieldRef<"PricingPlan", 'Int'>
    readonly priceYearly: FieldRef<"PricingPlan", 'Int'>
    readonly qrCodesLimit: FieldRef<"PricingPlan", 'Int'>
    readonly features: FieldRef<"PricingPlan", 'String'>
    readonly isActive: FieldRef<"PricingPlan", 'Boolean'>
    readonly createdAt: FieldRef<"PricingPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"PricingPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PricingPlan findUnique
   */
  export type PricingPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * Filter, which PricingPlan to fetch.
     */
    where: PricingPlanWhereUniqueInput
  }

  /**
   * PricingPlan findUniqueOrThrow
   */
  export type PricingPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * Filter, which PricingPlan to fetch.
     */
    where: PricingPlanWhereUniqueInput
  }

  /**
   * PricingPlan findFirst
   */
  export type PricingPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * Filter, which PricingPlan to fetch.
     */
    where?: PricingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingPlans to fetch.
     */
    orderBy?: PricingPlanOrderByWithRelationInput | PricingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingPlans.
     */
    cursor?: PricingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingPlans.
     */
    distinct?: PricingPlanScalarFieldEnum | PricingPlanScalarFieldEnum[]
  }

  /**
   * PricingPlan findFirstOrThrow
   */
  export type PricingPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * Filter, which PricingPlan to fetch.
     */
    where?: PricingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingPlans to fetch.
     */
    orderBy?: PricingPlanOrderByWithRelationInput | PricingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PricingPlans.
     */
    cursor?: PricingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PricingPlans.
     */
    distinct?: PricingPlanScalarFieldEnum | PricingPlanScalarFieldEnum[]
  }

  /**
   * PricingPlan findMany
   */
  export type PricingPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * Filter, which PricingPlans to fetch.
     */
    where?: PricingPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PricingPlans to fetch.
     */
    orderBy?: PricingPlanOrderByWithRelationInput | PricingPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PricingPlans.
     */
    cursor?: PricingPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PricingPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PricingPlans.
     */
    skip?: number
    distinct?: PricingPlanScalarFieldEnum | PricingPlanScalarFieldEnum[]
  }

  /**
   * PricingPlan create
   */
  export type PricingPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * The data needed to create a PricingPlan.
     */
    data: XOR<PricingPlanCreateInput, PricingPlanUncheckedCreateInput>
  }

  /**
   * PricingPlan createMany
   */
  export type PricingPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PricingPlans.
     */
    data: PricingPlanCreateManyInput | PricingPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PricingPlan update
   */
  export type PricingPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * The data needed to update a PricingPlan.
     */
    data: XOR<PricingPlanUpdateInput, PricingPlanUncheckedUpdateInput>
    /**
     * Choose, which PricingPlan to update.
     */
    where: PricingPlanWhereUniqueInput
  }

  /**
   * PricingPlan updateMany
   */
  export type PricingPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PricingPlans.
     */
    data: XOR<PricingPlanUpdateManyMutationInput, PricingPlanUncheckedUpdateManyInput>
    /**
     * Filter which PricingPlans to update
     */
    where?: PricingPlanWhereInput
    /**
     * Limit how many PricingPlans to update.
     */
    limit?: number
  }

  /**
   * PricingPlan upsert
   */
  export type PricingPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * The filter to search for the PricingPlan to update in case it exists.
     */
    where: PricingPlanWhereUniqueInput
    /**
     * In case the PricingPlan found by the `where` argument doesn't exist, create a new PricingPlan with this data.
     */
    create: XOR<PricingPlanCreateInput, PricingPlanUncheckedCreateInput>
    /**
     * In case the PricingPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PricingPlanUpdateInput, PricingPlanUncheckedUpdateInput>
  }

  /**
   * PricingPlan delete
   */
  export type PricingPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
    /**
     * Filter which PricingPlan to delete.
     */
    where: PricingPlanWhereUniqueInput
  }

  /**
   * PricingPlan deleteMany
   */
  export type PricingPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PricingPlans to delete
     */
    where?: PricingPlanWhereInput
    /**
     * Limit how many PricingPlans to delete.
     */
    limit?: number
  }

  /**
   * PricingPlan without action
   */
  export type PricingPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PricingPlan
     */
    select?: PricingPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PricingPlan
     */
    omit?: PricingPlanOmit<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    subscriptionId: number | null
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    subscriptionId: number | null
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    subscriptionId: number | null
    amount: number | null
    currency: string | null
    status: string | null
    paymentMethod: string | null
    transactionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    subscriptionId: number | null
    amount: number | null
    currency: string | null
    status: string | null
    paymentMethod: string | null
    transactionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    userId: number
    subscriptionId: number
    amount: number
    currency: number
    status: number
    paymentMethod: number
    transactionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    userId?: true
    subscriptionId?: true
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    userId?: true
    subscriptionId?: true
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    userId?: true
    subscriptionId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    transactionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    subscriptionId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    transactionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    userId?: true
    subscriptionId?: true
    amount?: true
    currency?: true
    status?: true
    paymentMethod?: true
    transactionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    userId: number
    subscriptionId: number
    amount: number
    currency: string
    status: string
    paymentMethod: string | null
    transactionId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    subscriptionId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    transactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>



  export type PaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    subscriptionId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    paymentMethod?: boolean
    transactionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "subscriptionId" | "amount" | "currency" | "status" | "paymentMethod" | "transactionId" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    subscription?: boolean | SubscriptionDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      subscription: Prisma.$SubscriptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      subscriptionId: number
      amount: number
      currency: string
      status: string
      paymentMethod: string | null
      transactionId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subscription<T extends SubscriptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubscriptionDefaultArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly userId: FieldRef<"Payment", 'Int'>
    readonly subscriptionId: FieldRef<"Payment", 'Int'>
    readonly amount: FieldRef<"Payment", 'Int'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly paymentMethod: FieldRef<"Payment", 'String'>
    readonly transactionId: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model DigitalBusinessCard
   */

  export type AggregateDigitalBusinessCard = {
    _count: DigitalBusinessCardCountAggregateOutputType | null
    _avg: DigitalBusinessCardAvgAggregateOutputType | null
    _sum: DigitalBusinessCardSumAggregateOutputType | null
    _min: DigitalBusinessCardMinAggregateOutputType | null
    _max: DigitalBusinessCardMaxAggregateOutputType | null
  }

  export type DigitalBusinessCardAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type DigitalBusinessCardSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type DigitalBusinessCardMinAggregateOutputType = {
    id: number | null
    userId: number | null
    uniqueCode: string | null
    template: string | null
    qrCodePath: string | null
    name: string | null
    title: string | null
    company: string | null
    phone: string | null
    email: string | null
    address: string | null
    website: string | null
    about: string | null
    pronoun: string | null
    accreditations: string | null
    profileUrl: string | null
    theme: string | null
    primaryColor: string | null
    secondaryColor: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalBusinessCardMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    uniqueCode: string | null
    template: string | null
    qrCodePath: string | null
    name: string | null
    title: string | null
    company: string | null
    phone: string | null
    email: string | null
    address: string | null
    website: string | null
    about: string | null
    pronoun: string | null
    accreditations: string | null
    profileUrl: string | null
    theme: string | null
    primaryColor: string | null
    secondaryColor: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DigitalBusinessCardCountAggregateOutputType = {
    id: number
    userId: number
    uniqueCode: number
    template: number
    qrCodePath: number
    name: number
    title: number
    company: number
    phone: number
    email: number
    address: number
    website: number
    about: number
    pronoun: number
    accreditations: number
    profileUrl: number
    theme: number
    primaryColor: number
    secondaryColor: number
    activeFields: number
    fieldData: number
    published: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DigitalBusinessCardAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type DigitalBusinessCardSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type DigitalBusinessCardMinAggregateInputType = {
    id?: true
    userId?: true
    uniqueCode?: true
    template?: true
    qrCodePath?: true
    name?: true
    title?: true
    company?: true
    phone?: true
    email?: true
    address?: true
    website?: true
    about?: true
    pronoun?: true
    accreditations?: true
    profileUrl?: true
    theme?: true
    primaryColor?: true
    secondaryColor?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalBusinessCardMaxAggregateInputType = {
    id?: true
    userId?: true
    uniqueCode?: true
    template?: true
    qrCodePath?: true
    name?: true
    title?: true
    company?: true
    phone?: true
    email?: true
    address?: true
    website?: true
    about?: true
    pronoun?: true
    accreditations?: true
    profileUrl?: true
    theme?: true
    primaryColor?: true
    secondaryColor?: true
    published?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DigitalBusinessCardCountAggregateInputType = {
    id?: true
    userId?: true
    uniqueCode?: true
    template?: true
    qrCodePath?: true
    name?: true
    title?: true
    company?: true
    phone?: true
    email?: true
    address?: true
    website?: true
    about?: true
    pronoun?: true
    accreditations?: true
    profileUrl?: true
    theme?: true
    primaryColor?: true
    secondaryColor?: true
    activeFields?: true
    fieldData?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DigitalBusinessCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalBusinessCard to aggregate.
     */
    where?: DigitalBusinessCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalBusinessCards to fetch.
     */
    orderBy?: DigitalBusinessCardOrderByWithRelationInput | DigitalBusinessCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DigitalBusinessCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalBusinessCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalBusinessCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DigitalBusinessCards
    **/
    _count?: true | DigitalBusinessCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DigitalBusinessCardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DigitalBusinessCardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DigitalBusinessCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DigitalBusinessCardMaxAggregateInputType
  }

  export type GetDigitalBusinessCardAggregateType<T extends DigitalBusinessCardAggregateArgs> = {
        [P in keyof T & keyof AggregateDigitalBusinessCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDigitalBusinessCard[P]>
      : GetScalarType<T[P], AggregateDigitalBusinessCard[P]>
  }




  export type DigitalBusinessCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DigitalBusinessCardWhereInput
    orderBy?: DigitalBusinessCardOrderByWithAggregationInput | DigitalBusinessCardOrderByWithAggregationInput[]
    by: DigitalBusinessCardScalarFieldEnum[] | DigitalBusinessCardScalarFieldEnum
    having?: DigitalBusinessCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DigitalBusinessCardCountAggregateInputType | true
    _avg?: DigitalBusinessCardAvgAggregateInputType
    _sum?: DigitalBusinessCardSumAggregateInputType
    _min?: DigitalBusinessCardMinAggregateInputType
    _max?: DigitalBusinessCardMaxAggregateInputType
  }

  export type DigitalBusinessCardGroupByOutputType = {
    id: number
    userId: number
    uniqueCode: string
    template: string
    qrCodePath: string
    name: string
    title: string | null
    company: string | null
    phone: string | null
    email: string | null
    address: string | null
    website: string | null
    about: string | null
    pronoun: string | null
    accreditations: string | null
    profileUrl: string | null
    theme: string | null
    primaryColor: string | null
    secondaryColor: string | null
    activeFields: JsonValue | null
    fieldData: JsonValue | null
    published: boolean
    createdAt: Date
    updatedAt: Date
    _count: DigitalBusinessCardCountAggregateOutputType | null
    _avg: DigitalBusinessCardAvgAggregateOutputType | null
    _sum: DigitalBusinessCardSumAggregateOutputType | null
    _min: DigitalBusinessCardMinAggregateOutputType | null
    _max: DigitalBusinessCardMaxAggregateOutputType | null
  }

  type GetDigitalBusinessCardGroupByPayload<T extends DigitalBusinessCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DigitalBusinessCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DigitalBusinessCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DigitalBusinessCardGroupByOutputType[P]>
            : GetScalarType<T[P], DigitalBusinessCardGroupByOutputType[P]>
        }
      >
    >


  export type DigitalBusinessCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    uniqueCode?: boolean
    template?: boolean
    qrCodePath?: boolean
    name?: boolean
    title?: boolean
    company?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    website?: boolean
    about?: boolean
    pronoun?: boolean
    accreditations?: boolean
    profileUrl?: boolean
    theme?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    activeFields?: boolean
    fieldData?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    qrCode?: boolean | QRCodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["digitalBusinessCard"]>



  export type DigitalBusinessCardSelectScalar = {
    id?: boolean
    userId?: boolean
    uniqueCode?: boolean
    template?: boolean
    qrCodePath?: boolean
    name?: boolean
    title?: boolean
    company?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    website?: boolean
    about?: boolean
    pronoun?: boolean
    accreditations?: boolean
    profileUrl?: boolean
    theme?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    activeFields?: boolean
    fieldData?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DigitalBusinessCardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "uniqueCode" | "template" | "qrCodePath" | "name" | "title" | "company" | "phone" | "email" | "address" | "website" | "about" | "pronoun" | "accreditations" | "profileUrl" | "theme" | "primaryColor" | "secondaryColor" | "activeFields" | "fieldData" | "published" | "createdAt" | "updatedAt", ExtArgs["result"]["digitalBusinessCard"]>
  export type DigitalBusinessCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    qrCode?: boolean | QRCodeDefaultArgs<ExtArgs>
  }

  export type $DigitalBusinessCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DigitalBusinessCard"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      qrCode: Prisma.$QRCodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      uniqueCode: string
      template: string
      qrCodePath: string
      name: string
      title: string | null
      company: string | null
      phone: string | null
      email: string | null
      address: string | null
      website: string | null
      about: string | null
      pronoun: string | null
      accreditations: string | null
      profileUrl: string | null
      theme: string | null
      primaryColor: string | null
      secondaryColor: string | null
      activeFields: Prisma.JsonValue | null
      fieldData: Prisma.JsonValue | null
      published: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["digitalBusinessCard"]>
    composites: {}
  }

  type DigitalBusinessCardGetPayload<S extends boolean | null | undefined | DigitalBusinessCardDefaultArgs> = $Result.GetResult<Prisma.$DigitalBusinessCardPayload, S>

  type DigitalBusinessCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DigitalBusinessCardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DigitalBusinessCardCountAggregateInputType | true
    }

  export interface DigitalBusinessCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DigitalBusinessCard'], meta: { name: 'DigitalBusinessCard' } }
    /**
     * Find zero or one DigitalBusinessCard that matches the filter.
     * @param {DigitalBusinessCardFindUniqueArgs} args - Arguments to find a DigitalBusinessCard
     * @example
     * // Get one DigitalBusinessCard
     * const digitalBusinessCard = await prisma.digitalBusinessCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DigitalBusinessCardFindUniqueArgs>(args: SelectSubset<T, DigitalBusinessCardFindUniqueArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DigitalBusinessCard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DigitalBusinessCardFindUniqueOrThrowArgs} args - Arguments to find a DigitalBusinessCard
     * @example
     * // Get one DigitalBusinessCard
     * const digitalBusinessCard = await prisma.digitalBusinessCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DigitalBusinessCardFindUniqueOrThrowArgs>(args: SelectSubset<T, DigitalBusinessCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DigitalBusinessCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalBusinessCardFindFirstArgs} args - Arguments to find a DigitalBusinessCard
     * @example
     * // Get one DigitalBusinessCard
     * const digitalBusinessCard = await prisma.digitalBusinessCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DigitalBusinessCardFindFirstArgs>(args?: SelectSubset<T, DigitalBusinessCardFindFirstArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DigitalBusinessCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalBusinessCardFindFirstOrThrowArgs} args - Arguments to find a DigitalBusinessCard
     * @example
     * // Get one DigitalBusinessCard
     * const digitalBusinessCard = await prisma.digitalBusinessCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DigitalBusinessCardFindFirstOrThrowArgs>(args?: SelectSubset<T, DigitalBusinessCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DigitalBusinessCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalBusinessCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DigitalBusinessCards
     * const digitalBusinessCards = await prisma.digitalBusinessCard.findMany()
     * 
     * // Get first 10 DigitalBusinessCards
     * const digitalBusinessCards = await prisma.digitalBusinessCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const digitalBusinessCardWithIdOnly = await prisma.digitalBusinessCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DigitalBusinessCardFindManyArgs>(args?: SelectSubset<T, DigitalBusinessCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DigitalBusinessCard.
     * @param {DigitalBusinessCardCreateArgs} args - Arguments to create a DigitalBusinessCard.
     * @example
     * // Create one DigitalBusinessCard
     * const DigitalBusinessCard = await prisma.digitalBusinessCard.create({
     *   data: {
     *     // ... data to create a DigitalBusinessCard
     *   }
     * })
     * 
     */
    create<T extends DigitalBusinessCardCreateArgs>(args: SelectSubset<T, DigitalBusinessCardCreateArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DigitalBusinessCards.
     * @param {DigitalBusinessCardCreateManyArgs} args - Arguments to create many DigitalBusinessCards.
     * @example
     * // Create many DigitalBusinessCards
     * const digitalBusinessCard = await prisma.digitalBusinessCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DigitalBusinessCardCreateManyArgs>(args?: SelectSubset<T, DigitalBusinessCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a DigitalBusinessCard.
     * @param {DigitalBusinessCardDeleteArgs} args - Arguments to delete one DigitalBusinessCard.
     * @example
     * // Delete one DigitalBusinessCard
     * const DigitalBusinessCard = await prisma.digitalBusinessCard.delete({
     *   where: {
     *     // ... filter to delete one DigitalBusinessCard
     *   }
     * })
     * 
     */
    delete<T extends DigitalBusinessCardDeleteArgs>(args: SelectSubset<T, DigitalBusinessCardDeleteArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DigitalBusinessCard.
     * @param {DigitalBusinessCardUpdateArgs} args - Arguments to update one DigitalBusinessCard.
     * @example
     * // Update one DigitalBusinessCard
     * const digitalBusinessCard = await prisma.digitalBusinessCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DigitalBusinessCardUpdateArgs>(args: SelectSubset<T, DigitalBusinessCardUpdateArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DigitalBusinessCards.
     * @param {DigitalBusinessCardDeleteManyArgs} args - Arguments to filter DigitalBusinessCards to delete.
     * @example
     * // Delete a few DigitalBusinessCards
     * const { count } = await prisma.digitalBusinessCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DigitalBusinessCardDeleteManyArgs>(args?: SelectSubset<T, DigitalBusinessCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DigitalBusinessCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalBusinessCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DigitalBusinessCards
     * const digitalBusinessCard = await prisma.digitalBusinessCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DigitalBusinessCardUpdateManyArgs>(args: SelectSubset<T, DigitalBusinessCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DigitalBusinessCard.
     * @param {DigitalBusinessCardUpsertArgs} args - Arguments to update or create a DigitalBusinessCard.
     * @example
     * // Update or create a DigitalBusinessCard
     * const digitalBusinessCard = await prisma.digitalBusinessCard.upsert({
     *   create: {
     *     // ... data to create a DigitalBusinessCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DigitalBusinessCard we want to update
     *   }
     * })
     */
    upsert<T extends DigitalBusinessCardUpsertArgs>(args: SelectSubset<T, DigitalBusinessCardUpsertArgs<ExtArgs>>): Prisma__DigitalBusinessCardClient<$Result.GetResult<Prisma.$DigitalBusinessCardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DigitalBusinessCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalBusinessCardCountArgs} args - Arguments to filter DigitalBusinessCards to count.
     * @example
     * // Count the number of DigitalBusinessCards
     * const count = await prisma.digitalBusinessCard.count({
     *   where: {
     *     // ... the filter for the DigitalBusinessCards we want to count
     *   }
     * })
    **/
    count<T extends DigitalBusinessCardCountArgs>(
      args?: Subset<T, DigitalBusinessCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DigitalBusinessCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DigitalBusinessCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalBusinessCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DigitalBusinessCardAggregateArgs>(args: Subset<T, DigitalBusinessCardAggregateArgs>): Prisma.PrismaPromise<GetDigitalBusinessCardAggregateType<T>>

    /**
     * Group by DigitalBusinessCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DigitalBusinessCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DigitalBusinessCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DigitalBusinessCardGroupByArgs['orderBy'] }
        : { orderBy?: DigitalBusinessCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DigitalBusinessCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDigitalBusinessCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DigitalBusinessCard model
   */
  readonly fields: DigitalBusinessCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DigitalBusinessCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DigitalBusinessCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    qrCode<T extends QRCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QRCodeDefaultArgs<ExtArgs>>): Prisma__QRCodeClient<$Result.GetResult<Prisma.$QRCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DigitalBusinessCard model
   */
  interface DigitalBusinessCardFieldRefs {
    readonly id: FieldRef<"DigitalBusinessCard", 'Int'>
    readonly userId: FieldRef<"DigitalBusinessCard", 'Int'>
    readonly uniqueCode: FieldRef<"DigitalBusinessCard", 'String'>
    readonly template: FieldRef<"DigitalBusinessCard", 'String'>
    readonly qrCodePath: FieldRef<"DigitalBusinessCard", 'String'>
    readonly name: FieldRef<"DigitalBusinessCard", 'String'>
    readonly title: FieldRef<"DigitalBusinessCard", 'String'>
    readonly company: FieldRef<"DigitalBusinessCard", 'String'>
    readonly phone: FieldRef<"DigitalBusinessCard", 'String'>
    readonly email: FieldRef<"DigitalBusinessCard", 'String'>
    readonly address: FieldRef<"DigitalBusinessCard", 'String'>
    readonly website: FieldRef<"DigitalBusinessCard", 'String'>
    readonly about: FieldRef<"DigitalBusinessCard", 'String'>
    readonly pronoun: FieldRef<"DigitalBusinessCard", 'String'>
    readonly accreditations: FieldRef<"DigitalBusinessCard", 'String'>
    readonly profileUrl: FieldRef<"DigitalBusinessCard", 'String'>
    readonly theme: FieldRef<"DigitalBusinessCard", 'String'>
    readonly primaryColor: FieldRef<"DigitalBusinessCard", 'String'>
    readonly secondaryColor: FieldRef<"DigitalBusinessCard", 'String'>
    readonly activeFields: FieldRef<"DigitalBusinessCard", 'Json'>
    readonly fieldData: FieldRef<"DigitalBusinessCard", 'Json'>
    readonly published: FieldRef<"DigitalBusinessCard", 'Boolean'>
    readonly createdAt: FieldRef<"DigitalBusinessCard", 'DateTime'>
    readonly updatedAt: FieldRef<"DigitalBusinessCard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DigitalBusinessCard findUnique
   */
  export type DigitalBusinessCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * Filter, which DigitalBusinessCard to fetch.
     */
    where: DigitalBusinessCardWhereUniqueInput
  }

  /**
   * DigitalBusinessCard findUniqueOrThrow
   */
  export type DigitalBusinessCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * Filter, which DigitalBusinessCard to fetch.
     */
    where: DigitalBusinessCardWhereUniqueInput
  }

  /**
   * DigitalBusinessCard findFirst
   */
  export type DigitalBusinessCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * Filter, which DigitalBusinessCard to fetch.
     */
    where?: DigitalBusinessCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalBusinessCards to fetch.
     */
    orderBy?: DigitalBusinessCardOrderByWithRelationInput | DigitalBusinessCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalBusinessCards.
     */
    cursor?: DigitalBusinessCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalBusinessCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalBusinessCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalBusinessCards.
     */
    distinct?: DigitalBusinessCardScalarFieldEnum | DigitalBusinessCardScalarFieldEnum[]
  }

  /**
   * DigitalBusinessCard findFirstOrThrow
   */
  export type DigitalBusinessCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * Filter, which DigitalBusinessCard to fetch.
     */
    where?: DigitalBusinessCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalBusinessCards to fetch.
     */
    orderBy?: DigitalBusinessCardOrderByWithRelationInput | DigitalBusinessCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DigitalBusinessCards.
     */
    cursor?: DigitalBusinessCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalBusinessCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalBusinessCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DigitalBusinessCards.
     */
    distinct?: DigitalBusinessCardScalarFieldEnum | DigitalBusinessCardScalarFieldEnum[]
  }

  /**
   * DigitalBusinessCard findMany
   */
  export type DigitalBusinessCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * Filter, which DigitalBusinessCards to fetch.
     */
    where?: DigitalBusinessCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DigitalBusinessCards to fetch.
     */
    orderBy?: DigitalBusinessCardOrderByWithRelationInput | DigitalBusinessCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DigitalBusinessCards.
     */
    cursor?: DigitalBusinessCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DigitalBusinessCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DigitalBusinessCards.
     */
    skip?: number
    distinct?: DigitalBusinessCardScalarFieldEnum | DigitalBusinessCardScalarFieldEnum[]
  }

  /**
   * DigitalBusinessCard create
   */
  export type DigitalBusinessCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * The data needed to create a DigitalBusinessCard.
     */
    data: XOR<DigitalBusinessCardCreateInput, DigitalBusinessCardUncheckedCreateInput>
  }

  /**
   * DigitalBusinessCard createMany
   */
  export type DigitalBusinessCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DigitalBusinessCards.
     */
    data: DigitalBusinessCardCreateManyInput | DigitalBusinessCardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DigitalBusinessCard update
   */
  export type DigitalBusinessCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * The data needed to update a DigitalBusinessCard.
     */
    data: XOR<DigitalBusinessCardUpdateInput, DigitalBusinessCardUncheckedUpdateInput>
    /**
     * Choose, which DigitalBusinessCard to update.
     */
    where: DigitalBusinessCardWhereUniqueInput
  }

  /**
   * DigitalBusinessCard updateMany
   */
  export type DigitalBusinessCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DigitalBusinessCards.
     */
    data: XOR<DigitalBusinessCardUpdateManyMutationInput, DigitalBusinessCardUncheckedUpdateManyInput>
    /**
     * Filter which DigitalBusinessCards to update
     */
    where?: DigitalBusinessCardWhereInput
    /**
     * Limit how many DigitalBusinessCards to update.
     */
    limit?: number
  }

  /**
   * DigitalBusinessCard upsert
   */
  export type DigitalBusinessCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * The filter to search for the DigitalBusinessCard to update in case it exists.
     */
    where: DigitalBusinessCardWhereUniqueInput
    /**
     * In case the DigitalBusinessCard found by the `where` argument doesn't exist, create a new DigitalBusinessCard with this data.
     */
    create: XOR<DigitalBusinessCardCreateInput, DigitalBusinessCardUncheckedCreateInput>
    /**
     * In case the DigitalBusinessCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DigitalBusinessCardUpdateInput, DigitalBusinessCardUncheckedUpdateInput>
  }

  /**
   * DigitalBusinessCard delete
   */
  export type DigitalBusinessCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
    /**
     * Filter which DigitalBusinessCard to delete.
     */
    where: DigitalBusinessCardWhereUniqueInput
  }

  /**
   * DigitalBusinessCard deleteMany
   */
  export type DigitalBusinessCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DigitalBusinessCards to delete
     */
    where?: DigitalBusinessCardWhereInput
    /**
     * Limit how many DigitalBusinessCards to delete.
     */
    limit?: number
  }

  /**
   * DigitalBusinessCard without action
   */
  export type DigitalBusinessCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DigitalBusinessCard
     */
    select?: DigitalBusinessCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DigitalBusinessCard
     */
    omit?: DigitalBusinessCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DigitalBusinessCardInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    location: 'location',
    company: 'company',
    comp_position: 'comp_position',
    usr_phone: 'usr_phone',
    twoFactorSecret: 'twoFactorSecret',
    twoFactorEnabled: 'twoFactorEnabled',
    twoFactorRecoveryCodes: 'twoFactorRecoveryCodes',
    emailNotificationsEnabled: 'emailNotificationsEnabled',
    smsNotificationsEnabled: 'smsNotificationsEnabled',
    pushNotificationsEnabled: 'pushNotificationsEnabled',
    feed_rating: 'feed_rating',
    feed_type: 'feed_type',
    feed_msg: 'feed_msg',
    subscriptionId: 'subscriptionId',
    subscriptionStart: 'subscriptionStart',
    subscriptionEnd: 'subscriptionEnd',
    isActive: 'isActive',
    qrCodesUsed: 'qrCodesUsed',
    qrCodesLimit: 'qrCodesLimit'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    fullName: 'fullName',
    role: 'role',
    isActive: 'isActive',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const AdminActionScalarFieldEnum: {
    id: 'id',
    adminId: 'adminId',
    userId: 'userId',
    actionType: 'actionType',
    description: 'description',
    oldValue: 'oldValue',
    newValue: 'newValue',
    createdAt: 'createdAt'
  };

  export type AdminActionScalarFieldEnum = (typeof AdminActionScalarFieldEnum)[keyof typeof AdminActionScalarFieldEnum]


  export const QRCodeScalarFieldEnum: {
    id: 'id',
    qrData: 'qrData',
    lastLink: 'lastLink',
    uniqueCode: 'uniqueCode',
    cornerShape: 'cornerShape',
    eyeShape: 'eyeShape',
    qrShape: 'qrShape',
    foregroundColor: 'foregroundColor',
    backgroundColor: 'backgroundColor',
    dotColor: 'dotColor',
    cornerColor: 'cornerColor',
    eyeColor: 'eyeColor',
    updateCount: 'updateCount',
    qrCodeImagePath: 'qrCodeImagePath',
    logoPath: 'logoPath',
    frameStyle: 'frameStyle',
    frameText: 'frameText',
    frameTextSize: 'frameTextSize',
    frameColor: 'frameColor',
    frameTextColor: 'frameTextColor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    qrStatus: 'qrStatus',
    download_count: 'download_count'
  };

  export type QRCodeScalarFieldEnum = (typeof QRCodeScalarFieldEnum)[keyof typeof QRCodeScalarFieldEnum]


  export const ScanLogScalarFieldEnum: {
    scanqr_id: 'scanqr_id',
    qr_code_id: 'qr_code_id',
    scanned_at: 'scanned_at',
    ip_address: 'ip_address',
    country: 'country',
    region: 'region',
    city: 'city',
    isp: 'isp',
    latitude: 'latitude',
    longitude: 'longitude',
    device_type: 'device_type',
    os_name: 'os_name',
    browser_name: 'browser_name'
  };

  export type ScanLogScalarFieldEnum = (typeof ScanLogScalarFieldEnum)[keyof typeof ScanLogScalarFieldEnum]


  export const DownloadLogScalarFieldEnum: {
    id: 'id',
    qr_code_id: 'qr_code_id',
    downloaded_at: 'downloaded_at'
  };

  export type DownloadLogScalarFieldEnum = (typeof DownloadLogScalarFieldEnum)[keyof typeof DownloadLogScalarFieldEnum]


  export const ProfileUpdateLogScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    updated_at: 'updated_at'
  };

  export type ProfileUpdateLogScalarFieldEnum = (typeof ProfileUpdateLogScalarFieldEnum)[keyof typeof ProfileUpdateLogScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    priceMonthly: 'priceMonthly',
    priceYearly: 'priceYearly',
    qrCodesLimit: 'qrCodesLimit',
    features: 'features',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const PricingPlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    priceMonthly: 'priceMonthly',
    priceYearly: 'priceYearly',
    qrCodesLimit: 'qrCodesLimit',
    features: 'features',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PricingPlanScalarFieldEnum = (typeof PricingPlanScalarFieldEnum)[keyof typeof PricingPlanScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    subscriptionId: 'subscriptionId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    paymentMethod: 'paymentMethod',
    transactionId: 'transactionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const DigitalBusinessCardScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    uniqueCode: 'uniqueCode',
    template: 'template',
    qrCodePath: 'qrCodePath',
    name: 'name',
    title: 'title',
    company: 'company',
    phone: 'phone',
    email: 'email',
    address: 'address',
    website: 'website',
    about: 'about',
    pronoun: 'pronoun',
    accreditations: 'accreditations',
    profileUrl: 'profileUrl',
    theme: 'theme',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor',
    activeFields: 'activeFields',
    fieldData: 'fieldData',
    published: 'published',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DigitalBusinessCardScalarFieldEnum = (typeof DigitalBusinessCardScalarFieldEnum)[keyof typeof DigitalBusinessCardScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    fullName: 'fullName',
    email: 'email',
    password: 'password',
    resetToken: 'resetToken',
    location: 'location',
    company: 'company',
    comp_position: 'comp_position',
    usr_phone: 'usr_phone',
    twoFactorSecret: 'twoFactorSecret',
    twoFactorRecoveryCodes: 'twoFactorRecoveryCodes',
    feed_type: 'feed_type',
    feed_msg: 'feed_msg'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const AdminUserOrderByRelevanceFieldEnum: {
    username: 'username',
    email: 'email',
    password: 'password',
    fullName: 'fullName',
    role: 'role'
  };

  export type AdminUserOrderByRelevanceFieldEnum = (typeof AdminUserOrderByRelevanceFieldEnum)[keyof typeof AdminUserOrderByRelevanceFieldEnum]


  export const AdminActionOrderByRelevanceFieldEnum: {
    actionType: 'actionType',
    description: 'description',
    oldValue: 'oldValue',
    newValue: 'newValue'
  };

  export type AdminActionOrderByRelevanceFieldEnum = (typeof AdminActionOrderByRelevanceFieldEnum)[keyof typeof AdminActionOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const QRCodeOrderByRelevanceFieldEnum: {
    lastLink: 'lastLink',
    uniqueCode: 'uniqueCode',
    cornerShape: 'cornerShape',
    eyeShape: 'eyeShape',
    qrShape: 'qrShape',
    foregroundColor: 'foregroundColor',
    backgroundColor: 'backgroundColor',
    dotColor: 'dotColor',
    cornerColor: 'cornerColor',
    eyeColor: 'eyeColor',
    qrCodeImagePath: 'qrCodeImagePath',
    logoPath: 'logoPath',
    frameStyle: 'frameStyle',
    frameText: 'frameText',
    frameTextSize: 'frameTextSize',
    frameColor: 'frameColor',
    frameTextColor: 'frameTextColor'
  };

  export type QRCodeOrderByRelevanceFieldEnum = (typeof QRCodeOrderByRelevanceFieldEnum)[keyof typeof QRCodeOrderByRelevanceFieldEnum]


  export const ScanLogOrderByRelevanceFieldEnum: {
    ip_address: 'ip_address',
    country: 'country',
    region: 'region',
    city: 'city',
    isp: 'isp',
    device_type: 'device_type',
    os_name: 'os_name',
    browser_name: 'browser_name'
  };

  export type ScanLogOrderByRelevanceFieldEnum = (typeof ScanLogOrderByRelevanceFieldEnum)[keyof typeof ScanLogOrderByRelevanceFieldEnum]


  export const SubscriptionOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description',
    features: 'features'
  };

  export type SubscriptionOrderByRelevanceFieldEnum = (typeof SubscriptionOrderByRelevanceFieldEnum)[keyof typeof SubscriptionOrderByRelevanceFieldEnum]


  export const PricingPlanOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description',
    features: 'features'
  };

  export type PricingPlanOrderByRelevanceFieldEnum = (typeof PricingPlanOrderByRelevanceFieldEnum)[keyof typeof PricingPlanOrderByRelevanceFieldEnum]


  export const PaymentOrderByRelevanceFieldEnum: {
    currency: 'currency',
    status: 'status',
    paymentMethod: 'paymentMethod',
    transactionId: 'transactionId'
  };

  export type PaymentOrderByRelevanceFieldEnum = (typeof PaymentOrderByRelevanceFieldEnum)[keyof typeof PaymentOrderByRelevanceFieldEnum]


  export const DigitalBusinessCardOrderByRelevanceFieldEnum: {
    uniqueCode: 'uniqueCode',
    template: 'template',
    qrCodePath: 'qrCodePath',
    name: 'name',
    title: 'title',
    company: 'company',
    phone: 'phone',
    email: 'email',
    address: 'address',
    website: 'website',
    about: 'about',
    pronoun: 'pronoun',
    accreditations: 'accreditations',
    profileUrl: 'profileUrl',
    theme: 'theme',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor'
  };

  export type DigitalBusinessCardOrderByRelevanceFieldEnum = (typeof DigitalBusinessCardOrderByRelevanceFieldEnum)[keyof typeof DigitalBusinessCardOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    location?: StringNullableFilter<"User"> | string | null
    company?: StringNullableFilter<"User"> | string | null
    comp_position?: StringNullableFilter<"User"> | string | null
    usr_phone?: StringNullableFilter<"User"> | string | null
    twoFactorSecret?: StringNullableFilter<"User"> | string | null
    twoFactorEnabled?: BoolFilter<"User"> | boolean
    twoFactorRecoveryCodes?: StringNullableFilter<"User"> | string | null
    emailNotificationsEnabled?: BoolFilter<"User"> | boolean
    smsNotificationsEnabled?: BoolFilter<"User"> | boolean
    pushNotificationsEnabled?: BoolFilter<"User"> | boolean
    feed_rating?: IntNullableFilter<"User"> | number | null
    feed_type?: StringNullableFilter<"User"> | string | null
    feed_msg?: StringNullableFilter<"User"> | string | null
    subscriptionId?: IntNullableFilter<"User"> | number | null
    subscriptionStart?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionEnd?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    qrCodesUsed?: IntFilter<"User"> | number
    qrCodesLimit?: IntFilter<"User"> | number
    qrCodes?: QRCodeListRelationFilter
    profileUpdateLogs?: ProfileUpdateLogListRelationFilter
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    payments?: PaymentListRelationFilter
    adminActions?: AdminActionListRelationFilter
    digitalBusinessCards?: DigitalBusinessCardListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    comp_position?: SortOrderInput | SortOrder
    usr_phone?: SortOrderInput | SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorRecoveryCodes?: SortOrderInput | SortOrder
    emailNotificationsEnabled?: SortOrder
    smsNotificationsEnabled?: SortOrder
    pushNotificationsEnabled?: SortOrder
    feed_rating?: SortOrderInput | SortOrder
    feed_type?: SortOrderInput | SortOrder
    feed_msg?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    subscriptionStart?: SortOrderInput | SortOrder
    subscriptionEnd?: SortOrderInput | SortOrder
    isActive?: SortOrder
    qrCodesUsed?: SortOrder
    qrCodesLimit?: SortOrder
    qrCodes?: QRCodeOrderByRelationAggregateInput
    profileUpdateLogs?: ProfileUpdateLogOrderByRelationAggregateInput
    subscription?: SubscriptionOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
    adminActions?: AdminActionOrderByRelationAggregateInput
    digitalBusinessCards?: DigitalBusinessCardOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    location?: StringNullableFilter<"User"> | string | null
    company?: StringNullableFilter<"User"> | string | null
    comp_position?: StringNullableFilter<"User"> | string | null
    usr_phone?: StringNullableFilter<"User"> | string | null
    twoFactorSecret?: StringNullableFilter<"User"> | string | null
    twoFactorEnabled?: BoolFilter<"User"> | boolean
    twoFactorRecoveryCodes?: StringNullableFilter<"User"> | string | null
    emailNotificationsEnabled?: BoolFilter<"User"> | boolean
    smsNotificationsEnabled?: BoolFilter<"User"> | boolean
    pushNotificationsEnabled?: BoolFilter<"User"> | boolean
    feed_rating?: IntNullableFilter<"User"> | number | null
    feed_type?: StringNullableFilter<"User"> | string | null
    feed_msg?: StringNullableFilter<"User"> | string | null
    subscriptionId?: IntNullableFilter<"User"> | number | null
    subscriptionStart?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionEnd?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    qrCodesUsed?: IntFilter<"User"> | number
    qrCodesLimit?: IntFilter<"User"> | number
    qrCodes?: QRCodeListRelationFilter
    profileUpdateLogs?: ProfileUpdateLogListRelationFilter
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    payments?: PaymentListRelationFilter
    adminActions?: AdminActionListRelationFilter
    digitalBusinessCards?: DigitalBusinessCardListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    comp_position?: SortOrderInput | SortOrder
    usr_phone?: SortOrderInput | SortOrder
    twoFactorSecret?: SortOrderInput | SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorRecoveryCodes?: SortOrderInput | SortOrder
    emailNotificationsEnabled?: SortOrder
    smsNotificationsEnabled?: SortOrder
    pushNotificationsEnabled?: SortOrder
    feed_rating?: SortOrderInput | SortOrder
    feed_type?: SortOrderInput | SortOrder
    feed_msg?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    subscriptionStart?: SortOrderInput | SortOrder
    subscriptionEnd?: SortOrderInput | SortOrder
    isActive?: SortOrder
    qrCodesUsed?: SortOrder
    qrCodesLimit?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    fullName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    location?: StringNullableWithAggregatesFilter<"User"> | string | null
    company?: StringNullableWithAggregatesFilter<"User"> | string | null
    comp_position?: StringNullableWithAggregatesFilter<"User"> | string | null
    usr_phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    twoFactorSecret?: StringNullableWithAggregatesFilter<"User"> | string | null
    twoFactorEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    twoFactorRecoveryCodes?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailNotificationsEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    smsNotificationsEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    pushNotificationsEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    feed_rating?: IntNullableWithAggregatesFilter<"User"> | number | null
    feed_type?: StringNullableWithAggregatesFilter<"User"> | string | null
    feed_msg?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionId?: IntNullableWithAggregatesFilter<"User"> | number | null
    subscriptionStart?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    subscriptionEnd?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    qrCodesUsed?: IntWithAggregatesFilter<"User"> | number
    qrCodesLimit?: IntWithAggregatesFilter<"User"> | number
  }

  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: IntFilter<"AdminUser"> | number
    username?: StringFilter<"AdminUser"> | string
    email?: StringFilter<"AdminUser"> | string
    password?: StringFilter<"AdminUser"> | string
    fullName?: StringFilter<"AdminUser"> | string
    role?: StringFilter<"AdminUser"> | string
    isActive?: BoolFilter<"AdminUser"> | boolean
    lastLogin?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    actions?: AdminActionListRelationFilter
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    actions?: AdminActionOrderByRelationAggregateInput
    _relevance?: AdminUserOrderByRelevanceInput
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    password?: StringFilter<"AdminUser"> | string
    fullName?: StringFilter<"AdminUser"> | string
    role?: StringFilter<"AdminUser"> | string
    isActive?: BoolFilter<"AdminUser"> | boolean
    lastLogin?: DateTimeNullableFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    actions?: AdminActionListRelationFilter
  }, "id" | "username" | "email">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _avg?: AdminUserAvgOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
    _sum?: AdminUserSumOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AdminUser"> | number
    username?: StringWithAggregatesFilter<"AdminUser"> | string
    email?: StringWithAggregatesFilter<"AdminUser"> | string
    password?: StringWithAggregatesFilter<"AdminUser"> | string
    fullName?: StringWithAggregatesFilter<"AdminUser"> | string
    role?: StringWithAggregatesFilter<"AdminUser"> | string
    isActive?: BoolWithAggregatesFilter<"AdminUser"> | boolean
    lastLogin?: DateTimeNullableWithAggregatesFilter<"AdminUser"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type AdminActionWhereInput = {
    AND?: AdminActionWhereInput | AdminActionWhereInput[]
    OR?: AdminActionWhereInput[]
    NOT?: AdminActionWhereInput | AdminActionWhereInput[]
    id?: IntFilter<"AdminAction"> | number
    adminId?: IntFilter<"AdminAction"> | number
    userId?: IntNullableFilter<"AdminAction"> | number | null
    actionType?: StringFilter<"AdminAction"> | string
    description?: StringFilter<"AdminAction"> | string
    oldValue?: StringNullableFilter<"AdminAction"> | string | null
    newValue?: StringNullableFilter<"AdminAction"> | string | null
    createdAt?: DateTimeFilter<"AdminAction"> | Date | string
    admin?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AdminActionOrderByWithRelationInput = {
    id?: SortOrder
    adminId?: SortOrder
    userId?: SortOrderInput | SortOrder
    actionType?: SortOrder
    description?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    admin?: AdminUserOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    _relevance?: AdminActionOrderByRelevanceInput
  }

  export type AdminActionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AdminActionWhereInput | AdminActionWhereInput[]
    OR?: AdminActionWhereInput[]
    NOT?: AdminActionWhereInput | AdminActionWhereInput[]
    adminId?: IntFilter<"AdminAction"> | number
    userId?: IntNullableFilter<"AdminAction"> | number | null
    actionType?: StringFilter<"AdminAction"> | string
    description?: StringFilter<"AdminAction"> | string
    oldValue?: StringNullableFilter<"AdminAction"> | string | null
    newValue?: StringNullableFilter<"AdminAction"> | string | null
    createdAt?: DateTimeFilter<"AdminAction"> | Date | string
    admin?: XOR<AdminUserScalarRelationFilter, AdminUserWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AdminActionOrderByWithAggregationInput = {
    id?: SortOrder
    adminId?: SortOrder
    userId?: SortOrderInput | SortOrder
    actionType?: SortOrder
    description?: SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AdminActionCountOrderByAggregateInput
    _avg?: AdminActionAvgOrderByAggregateInput
    _max?: AdminActionMaxOrderByAggregateInput
    _min?: AdminActionMinOrderByAggregateInput
    _sum?: AdminActionSumOrderByAggregateInput
  }

  export type AdminActionScalarWhereWithAggregatesInput = {
    AND?: AdminActionScalarWhereWithAggregatesInput | AdminActionScalarWhereWithAggregatesInput[]
    OR?: AdminActionScalarWhereWithAggregatesInput[]
    NOT?: AdminActionScalarWhereWithAggregatesInput | AdminActionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AdminAction"> | number
    adminId?: IntWithAggregatesFilter<"AdminAction"> | number
    userId?: IntNullableWithAggregatesFilter<"AdminAction"> | number | null
    actionType?: StringWithAggregatesFilter<"AdminAction"> | string
    description?: StringWithAggregatesFilter<"AdminAction"> | string
    oldValue?: StringNullableWithAggregatesFilter<"AdminAction"> | string | null
    newValue?: StringNullableWithAggregatesFilter<"AdminAction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminAction"> | Date | string
  }

  export type QRCodeWhereInput = {
    AND?: QRCodeWhereInput | QRCodeWhereInput[]
    OR?: QRCodeWhereInput[]
    NOT?: QRCodeWhereInput | QRCodeWhereInput[]
    id?: IntFilter<"QRCode"> | number
    qrData?: JsonFilter<"QRCode">
    lastLink?: StringNullableFilter<"QRCode"> | string | null
    uniqueCode?: StringFilter<"QRCode"> | string
    cornerShape?: StringFilter<"QRCode"> | string
    eyeShape?: StringFilter<"QRCode"> | string
    qrShape?: StringFilter<"QRCode"> | string
    foregroundColor?: StringFilter<"QRCode"> | string
    backgroundColor?: StringFilter<"QRCode"> | string
    dotColor?: StringNullableFilter<"QRCode"> | string | null
    cornerColor?: StringNullableFilter<"QRCode"> | string | null
    eyeColor?: StringNullableFilter<"QRCode"> | string | null
    updateCount?: IntFilter<"QRCode"> | number
    qrCodeImagePath?: StringNullableFilter<"QRCode"> | string | null
    logoPath?: StringNullableFilter<"QRCode"> | string | null
    frameStyle?: StringNullableFilter<"QRCode"> | string | null
    frameText?: StringNullableFilter<"QRCode"> | string | null
    frameTextSize?: StringNullableFilter<"QRCode"> | string | null
    frameColor?: StringNullableFilter<"QRCode"> | string | null
    frameTextColor?: StringNullableFilter<"QRCode"> | string | null
    createdAt?: DateTimeFilter<"QRCode"> | Date | string
    updatedAt?: DateTimeFilter<"QRCode"> | Date | string
    userId?: IntNullableFilter<"QRCode"> | number | null
    qrStatus?: BoolFilter<"QRCode"> | boolean
    download_count?: IntFilter<"QRCode"> | number
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    scanLogs?: ScanLogListRelationFilter
    downloadLogs?: DownloadLogListRelationFilter
    digitalBusinessCard?: XOR<DigitalBusinessCardNullableScalarRelationFilter, DigitalBusinessCardWhereInput> | null
  }

  export type QRCodeOrderByWithRelationInput = {
    id?: SortOrder
    qrData?: SortOrder
    lastLink?: SortOrderInput | SortOrder
    uniqueCode?: SortOrder
    cornerShape?: SortOrder
    eyeShape?: SortOrder
    qrShape?: SortOrder
    foregroundColor?: SortOrder
    backgroundColor?: SortOrder
    dotColor?: SortOrderInput | SortOrder
    cornerColor?: SortOrderInput | SortOrder
    eyeColor?: SortOrderInput | SortOrder
    updateCount?: SortOrder
    qrCodeImagePath?: SortOrderInput | SortOrder
    logoPath?: SortOrderInput | SortOrder
    frameStyle?: SortOrderInput | SortOrder
    frameText?: SortOrderInput | SortOrder
    frameTextSize?: SortOrderInput | SortOrder
    frameColor?: SortOrderInput | SortOrder
    frameTextColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    qrStatus?: SortOrder
    download_count?: SortOrder
    user?: UserOrderByWithRelationInput
    scanLogs?: ScanLogOrderByRelationAggregateInput
    downloadLogs?: DownloadLogOrderByRelationAggregateInput
    digitalBusinessCard?: DigitalBusinessCardOrderByWithRelationInput
    _relevance?: QRCodeOrderByRelevanceInput
  }

  export type QRCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uniqueCode?: string
    AND?: QRCodeWhereInput | QRCodeWhereInput[]
    OR?: QRCodeWhereInput[]
    NOT?: QRCodeWhereInput | QRCodeWhereInput[]
    qrData?: JsonFilter<"QRCode">
    lastLink?: StringNullableFilter<"QRCode"> | string | null
    cornerShape?: StringFilter<"QRCode"> | string
    eyeShape?: StringFilter<"QRCode"> | string
    qrShape?: StringFilter<"QRCode"> | string
    foregroundColor?: StringFilter<"QRCode"> | string
    backgroundColor?: StringFilter<"QRCode"> | string
    dotColor?: StringNullableFilter<"QRCode"> | string | null
    cornerColor?: StringNullableFilter<"QRCode"> | string | null
    eyeColor?: StringNullableFilter<"QRCode"> | string | null
    updateCount?: IntFilter<"QRCode"> | number
    qrCodeImagePath?: StringNullableFilter<"QRCode"> | string | null
    logoPath?: StringNullableFilter<"QRCode"> | string | null
    frameStyle?: StringNullableFilter<"QRCode"> | string | null
    frameText?: StringNullableFilter<"QRCode"> | string | null
    frameTextSize?: StringNullableFilter<"QRCode"> | string | null
    frameColor?: StringNullableFilter<"QRCode"> | string | null
    frameTextColor?: StringNullableFilter<"QRCode"> | string | null
    createdAt?: DateTimeFilter<"QRCode"> | Date | string
    updatedAt?: DateTimeFilter<"QRCode"> | Date | string
    userId?: IntNullableFilter<"QRCode"> | number | null
    qrStatus?: BoolFilter<"QRCode"> | boolean
    download_count?: IntFilter<"QRCode"> | number
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    scanLogs?: ScanLogListRelationFilter
    downloadLogs?: DownloadLogListRelationFilter
    digitalBusinessCard?: XOR<DigitalBusinessCardNullableScalarRelationFilter, DigitalBusinessCardWhereInput> | null
  }, "id" | "uniqueCode">

  export type QRCodeOrderByWithAggregationInput = {
    id?: SortOrder
    qrData?: SortOrder
    lastLink?: SortOrderInput | SortOrder
    uniqueCode?: SortOrder
    cornerShape?: SortOrder
    eyeShape?: SortOrder
    qrShape?: SortOrder
    foregroundColor?: SortOrder
    backgroundColor?: SortOrder
    dotColor?: SortOrderInput | SortOrder
    cornerColor?: SortOrderInput | SortOrder
    eyeColor?: SortOrderInput | SortOrder
    updateCount?: SortOrder
    qrCodeImagePath?: SortOrderInput | SortOrder
    logoPath?: SortOrderInput | SortOrder
    frameStyle?: SortOrderInput | SortOrder
    frameText?: SortOrderInput | SortOrder
    frameTextSize?: SortOrderInput | SortOrder
    frameColor?: SortOrderInput | SortOrder
    frameTextColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrderInput | SortOrder
    qrStatus?: SortOrder
    download_count?: SortOrder
    _count?: QRCodeCountOrderByAggregateInput
    _avg?: QRCodeAvgOrderByAggregateInput
    _max?: QRCodeMaxOrderByAggregateInput
    _min?: QRCodeMinOrderByAggregateInput
    _sum?: QRCodeSumOrderByAggregateInput
  }

  export type QRCodeScalarWhereWithAggregatesInput = {
    AND?: QRCodeScalarWhereWithAggregatesInput | QRCodeScalarWhereWithAggregatesInput[]
    OR?: QRCodeScalarWhereWithAggregatesInput[]
    NOT?: QRCodeScalarWhereWithAggregatesInput | QRCodeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QRCode"> | number
    qrData?: JsonWithAggregatesFilter<"QRCode">
    lastLink?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    uniqueCode?: StringWithAggregatesFilter<"QRCode"> | string
    cornerShape?: StringWithAggregatesFilter<"QRCode"> | string
    eyeShape?: StringWithAggregatesFilter<"QRCode"> | string
    qrShape?: StringWithAggregatesFilter<"QRCode"> | string
    foregroundColor?: StringWithAggregatesFilter<"QRCode"> | string
    backgroundColor?: StringWithAggregatesFilter<"QRCode"> | string
    dotColor?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    cornerColor?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    eyeColor?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    updateCount?: IntWithAggregatesFilter<"QRCode"> | number
    qrCodeImagePath?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    logoPath?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    frameStyle?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    frameText?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    frameTextSize?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    frameColor?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    frameTextColor?: StringNullableWithAggregatesFilter<"QRCode"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QRCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"QRCode"> | Date | string
    userId?: IntNullableWithAggregatesFilter<"QRCode"> | number | null
    qrStatus?: BoolWithAggregatesFilter<"QRCode"> | boolean
    download_count?: IntWithAggregatesFilter<"QRCode"> | number
  }

  export type ScanLogWhereInput = {
    AND?: ScanLogWhereInput | ScanLogWhereInput[]
    OR?: ScanLogWhereInput[]
    NOT?: ScanLogWhereInput | ScanLogWhereInput[]
    scanqr_id?: IntFilter<"ScanLog"> | number
    qr_code_id?: IntFilter<"ScanLog"> | number
    scanned_at?: DateTimeFilter<"ScanLog"> | Date | string
    ip_address?: StringNullableFilter<"ScanLog"> | string | null
    country?: StringNullableFilter<"ScanLog"> | string | null
    region?: StringNullableFilter<"ScanLog"> | string | null
    city?: StringNullableFilter<"ScanLog"> | string | null
    isp?: StringNullableFilter<"ScanLog"> | string | null
    latitude?: DecimalNullableFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    device_type?: StringNullableFilter<"ScanLog"> | string | null
    os_name?: StringNullableFilter<"ScanLog"> | string | null
    browser_name?: StringNullableFilter<"ScanLog"> | string | null
    QRCode?: XOR<QRCodeScalarRelationFilter, QRCodeWhereInput>
  }

  export type ScanLogOrderByWithRelationInput = {
    scanqr_id?: SortOrder
    qr_code_id?: SortOrder
    scanned_at?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    isp?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    device_type?: SortOrderInput | SortOrder
    os_name?: SortOrderInput | SortOrder
    browser_name?: SortOrderInput | SortOrder
    QRCode?: QRCodeOrderByWithRelationInput
    _relevance?: ScanLogOrderByRelevanceInput
  }

  export type ScanLogWhereUniqueInput = Prisma.AtLeast<{
    scanqr_id?: number
    AND?: ScanLogWhereInput | ScanLogWhereInput[]
    OR?: ScanLogWhereInput[]
    NOT?: ScanLogWhereInput | ScanLogWhereInput[]
    qr_code_id?: IntFilter<"ScanLog"> | number
    scanned_at?: DateTimeFilter<"ScanLog"> | Date | string
    ip_address?: StringNullableFilter<"ScanLog"> | string | null
    country?: StringNullableFilter<"ScanLog"> | string | null
    region?: StringNullableFilter<"ScanLog"> | string | null
    city?: StringNullableFilter<"ScanLog"> | string | null
    isp?: StringNullableFilter<"ScanLog"> | string | null
    latitude?: DecimalNullableFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    device_type?: StringNullableFilter<"ScanLog"> | string | null
    os_name?: StringNullableFilter<"ScanLog"> | string | null
    browser_name?: StringNullableFilter<"ScanLog"> | string | null
    QRCode?: XOR<QRCodeScalarRelationFilter, QRCodeWhereInput>
  }, "scanqr_id">

  export type ScanLogOrderByWithAggregationInput = {
    scanqr_id?: SortOrder
    qr_code_id?: SortOrder
    scanned_at?: SortOrder
    ip_address?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    region?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    isp?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    device_type?: SortOrderInput | SortOrder
    os_name?: SortOrderInput | SortOrder
    browser_name?: SortOrderInput | SortOrder
    _count?: ScanLogCountOrderByAggregateInput
    _avg?: ScanLogAvgOrderByAggregateInput
    _max?: ScanLogMaxOrderByAggregateInput
    _min?: ScanLogMinOrderByAggregateInput
    _sum?: ScanLogSumOrderByAggregateInput
  }

  export type ScanLogScalarWhereWithAggregatesInput = {
    AND?: ScanLogScalarWhereWithAggregatesInput | ScanLogScalarWhereWithAggregatesInput[]
    OR?: ScanLogScalarWhereWithAggregatesInput[]
    NOT?: ScanLogScalarWhereWithAggregatesInput | ScanLogScalarWhereWithAggregatesInput[]
    scanqr_id?: IntWithAggregatesFilter<"ScanLog"> | number
    qr_code_id?: IntWithAggregatesFilter<"ScanLog"> | number
    scanned_at?: DateTimeWithAggregatesFilter<"ScanLog"> | Date | string
    ip_address?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
    country?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
    region?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
    city?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
    isp?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
    latitude?: DecimalNullableWithAggregatesFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableWithAggregatesFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    device_type?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
    os_name?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
    browser_name?: StringNullableWithAggregatesFilter<"ScanLog"> | string | null
  }

  export type DownloadLogWhereInput = {
    AND?: DownloadLogWhereInput | DownloadLogWhereInput[]
    OR?: DownloadLogWhereInput[]
    NOT?: DownloadLogWhereInput | DownloadLogWhereInput[]
    id?: IntFilter<"DownloadLog"> | number
    qr_code_id?: IntFilter<"DownloadLog"> | number
    downloaded_at?: DateTimeFilter<"DownloadLog"> | Date | string
    QRCode?: XOR<QRCodeScalarRelationFilter, QRCodeWhereInput>
  }

  export type DownloadLogOrderByWithRelationInput = {
    id?: SortOrder
    qr_code_id?: SortOrder
    downloaded_at?: SortOrder
    QRCode?: QRCodeOrderByWithRelationInput
  }

  export type DownloadLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DownloadLogWhereInput | DownloadLogWhereInput[]
    OR?: DownloadLogWhereInput[]
    NOT?: DownloadLogWhereInput | DownloadLogWhereInput[]
    qr_code_id?: IntFilter<"DownloadLog"> | number
    downloaded_at?: DateTimeFilter<"DownloadLog"> | Date | string
    QRCode?: XOR<QRCodeScalarRelationFilter, QRCodeWhereInput>
  }, "id">

  export type DownloadLogOrderByWithAggregationInput = {
    id?: SortOrder
    qr_code_id?: SortOrder
    downloaded_at?: SortOrder
    _count?: DownloadLogCountOrderByAggregateInput
    _avg?: DownloadLogAvgOrderByAggregateInput
    _max?: DownloadLogMaxOrderByAggregateInput
    _min?: DownloadLogMinOrderByAggregateInput
    _sum?: DownloadLogSumOrderByAggregateInput
  }

  export type DownloadLogScalarWhereWithAggregatesInput = {
    AND?: DownloadLogScalarWhereWithAggregatesInput | DownloadLogScalarWhereWithAggregatesInput[]
    OR?: DownloadLogScalarWhereWithAggregatesInput[]
    NOT?: DownloadLogScalarWhereWithAggregatesInput | DownloadLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DownloadLog"> | number
    qr_code_id?: IntWithAggregatesFilter<"DownloadLog"> | number
    downloaded_at?: DateTimeWithAggregatesFilter<"DownloadLog"> | Date | string
  }

  export type ProfileUpdateLogWhereInput = {
    AND?: ProfileUpdateLogWhereInput | ProfileUpdateLogWhereInput[]
    OR?: ProfileUpdateLogWhereInput[]
    NOT?: ProfileUpdateLogWhereInput | ProfileUpdateLogWhereInput[]
    id?: IntFilter<"ProfileUpdateLog"> | number
    user_id?: IntFilter<"ProfileUpdateLog"> | number
    updated_at?: DateTimeFilter<"ProfileUpdateLog"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProfileUpdateLogOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    updated_at?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type ProfileUpdateLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProfileUpdateLogWhereInput | ProfileUpdateLogWhereInput[]
    OR?: ProfileUpdateLogWhereInput[]
    NOT?: ProfileUpdateLogWhereInput | ProfileUpdateLogWhereInput[]
    user_id?: IntFilter<"ProfileUpdateLog"> | number
    updated_at?: DateTimeFilter<"ProfileUpdateLog"> | Date | string
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProfileUpdateLogOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    updated_at?: SortOrder
    _count?: ProfileUpdateLogCountOrderByAggregateInput
    _avg?: ProfileUpdateLogAvgOrderByAggregateInput
    _max?: ProfileUpdateLogMaxOrderByAggregateInput
    _min?: ProfileUpdateLogMinOrderByAggregateInput
    _sum?: ProfileUpdateLogSumOrderByAggregateInput
  }

  export type ProfileUpdateLogScalarWhereWithAggregatesInput = {
    AND?: ProfileUpdateLogScalarWhereWithAggregatesInput | ProfileUpdateLogScalarWhereWithAggregatesInput[]
    OR?: ProfileUpdateLogScalarWhereWithAggregatesInput[]
    NOT?: ProfileUpdateLogScalarWhereWithAggregatesInput | ProfileUpdateLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProfileUpdateLog"> | number
    user_id?: IntWithAggregatesFilter<"ProfileUpdateLog"> | number
    updated_at?: DateTimeWithAggregatesFilter<"ProfileUpdateLog"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: IntFilter<"Subscription"> | number
    name?: StringFilter<"Subscription"> | string
    description?: StringFilter<"Subscription"> | string
    priceMonthly?: IntFilter<"Subscription"> | number
    priceYearly?: IntFilter<"Subscription"> | number
    qrCodesLimit?: IntFilter<"Subscription"> | number
    features?: StringFilter<"Subscription"> | string
    isActive?: BoolFilter<"Subscription"> | boolean
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    users?: UserListRelationFilter
    payments?: PaymentListRelationFilter
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    _relevance?: SubscriptionOrderByRelevanceInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    name?: StringFilter<"Subscription"> | string
    description?: StringFilter<"Subscription"> | string
    priceMonthly?: IntFilter<"Subscription"> | number
    priceYearly?: IntFilter<"Subscription"> | number
    qrCodesLimit?: IntFilter<"Subscription"> | number
    features?: StringFilter<"Subscription"> | string
    isActive?: BoolFilter<"Subscription"> | boolean
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    users?: UserListRelationFilter
    payments?: PaymentListRelationFilter
  }, "id">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _avg?: SubscriptionAvgOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
    _sum?: SubscriptionSumOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subscription"> | number
    name?: StringWithAggregatesFilter<"Subscription"> | string
    description?: StringWithAggregatesFilter<"Subscription"> | string
    priceMonthly?: IntWithAggregatesFilter<"Subscription"> | number
    priceYearly?: IntWithAggregatesFilter<"Subscription"> | number
    qrCodesLimit?: IntWithAggregatesFilter<"Subscription"> | number
    features?: StringWithAggregatesFilter<"Subscription"> | string
    isActive?: BoolWithAggregatesFilter<"Subscription"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type PricingPlanWhereInput = {
    AND?: PricingPlanWhereInput | PricingPlanWhereInput[]
    OR?: PricingPlanWhereInput[]
    NOT?: PricingPlanWhereInput | PricingPlanWhereInput[]
    id?: IntFilter<"PricingPlan"> | number
    name?: StringFilter<"PricingPlan"> | string
    description?: StringFilter<"PricingPlan"> | string
    priceMonthly?: IntFilter<"PricingPlan"> | number
    priceYearly?: IntFilter<"PricingPlan"> | number
    qrCodesLimit?: IntFilter<"PricingPlan"> | number
    features?: StringFilter<"PricingPlan"> | string
    isActive?: BoolFilter<"PricingPlan"> | boolean
    createdAt?: DateTimeFilter<"PricingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"PricingPlan"> | Date | string
  }

  export type PricingPlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: PricingPlanOrderByRelevanceInput
  }

  export type PricingPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PricingPlanWhereInput | PricingPlanWhereInput[]
    OR?: PricingPlanWhereInput[]
    NOT?: PricingPlanWhereInput | PricingPlanWhereInput[]
    name?: StringFilter<"PricingPlan"> | string
    description?: StringFilter<"PricingPlan"> | string
    priceMonthly?: IntFilter<"PricingPlan"> | number
    priceYearly?: IntFilter<"PricingPlan"> | number
    qrCodesLimit?: IntFilter<"PricingPlan"> | number
    features?: StringFilter<"PricingPlan"> | string
    isActive?: BoolFilter<"PricingPlan"> | boolean
    createdAt?: DateTimeFilter<"PricingPlan"> | Date | string
    updatedAt?: DateTimeFilter<"PricingPlan"> | Date | string
  }, "id">

  export type PricingPlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PricingPlanCountOrderByAggregateInput
    _avg?: PricingPlanAvgOrderByAggregateInput
    _max?: PricingPlanMaxOrderByAggregateInput
    _min?: PricingPlanMinOrderByAggregateInput
    _sum?: PricingPlanSumOrderByAggregateInput
  }

  export type PricingPlanScalarWhereWithAggregatesInput = {
    AND?: PricingPlanScalarWhereWithAggregatesInput | PricingPlanScalarWhereWithAggregatesInput[]
    OR?: PricingPlanScalarWhereWithAggregatesInput[]
    NOT?: PricingPlanScalarWhereWithAggregatesInput | PricingPlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PricingPlan"> | number
    name?: StringWithAggregatesFilter<"PricingPlan"> | string
    description?: StringWithAggregatesFilter<"PricingPlan"> | string
    priceMonthly?: IntWithAggregatesFilter<"PricingPlan"> | number
    priceYearly?: IntWithAggregatesFilter<"PricingPlan"> | number
    qrCodesLimit?: IntWithAggregatesFilter<"PricingPlan"> | number
    features?: StringWithAggregatesFilter<"PricingPlan"> | string
    isActive?: BoolWithAggregatesFilter<"PricingPlan"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PricingPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PricingPlan"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    userId?: IntFilter<"Payment"> | number
    subscriptionId?: IntFilter<"Payment"> | number
    amount?: IntFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    transactionId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    subscription?: SubscriptionOrderByWithRelationInput
    _relevance?: PaymentOrderByRelevanceInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: IntFilter<"Payment"> | number
    subscriptionId?: IntFilter<"Payment"> | number
    amount?: IntFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    transactionId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    subscription?: XOR<SubscriptionScalarRelationFilter, SubscriptionWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    userId?: IntWithAggregatesFilter<"Payment"> | number
    subscriptionId?: IntWithAggregatesFilter<"Payment"> | number
    amount?: IntWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    status?: StringWithAggregatesFilter<"Payment"> | string
    paymentMethod?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    transactionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type DigitalBusinessCardWhereInput = {
    AND?: DigitalBusinessCardWhereInput | DigitalBusinessCardWhereInput[]
    OR?: DigitalBusinessCardWhereInput[]
    NOT?: DigitalBusinessCardWhereInput | DigitalBusinessCardWhereInput[]
    id?: IntFilter<"DigitalBusinessCard"> | number
    userId?: IntFilter<"DigitalBusinessCard"> | number
    uniqueCode?: StringFilter<"DigitalBusinessCard"> | string
    template?: StringFilter<"DigitalBusinessCard"> | string
    qrCodePath?: StringFilter<"DigitalBusinessCard"> | string
    name?: StringFilter<"DigitalBusinessCard"> | string
    title?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    company?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    phone?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    email?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    address?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    website?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    about?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    pronoun?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    accreditations?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    profileUrl?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    theme?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    primaryColor?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    secondaryColor?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    activeFields?: JsonNullableFilter<"DigitalBusinessCard">
    fieldData?: JsonNullableFilter<"DigitalBusinessCard">
    published?: BoolFilter<"DigitalBusinessCard"> | boolean
    createdAt?: DateTimeFilter<"DigitalBusinessCard"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalBusinessCard"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qrCode?: XOR<QRCodeScalarRelationFilter, QRCodeWhereInput>
  }

  export type DigitalBusinessCardOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    uniqueCode?: SortOrder
    template?: SortOrder
    qrCodePath?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    pronoun?: SortOrderInput | SortOrder
    accreditations?: SortOrderInput | SortOrder
    profileUrl?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    secondaryColor?: SortOrderInput | SortOrder
    activeFields?: SortOrderInput | SortOrder
    fieldData?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    qrCode?: QRCodeOrderByWithRelationInput
    _relevance?: DigitalBusinessCardOrderByRelevanceInput
  }

  export type DigitalBusinessCardWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uniqueCode?: string
    AND?: DigitalBusinessCardWhereInput | DigitalBusinessCardWhereInput[]
    OR?: DigitalBusinessCardWhereInput[]
    NOT?: DigitalBusinessCardWhereInput | DigitalBusinessCardWhereInput[]
    userId?: IntFilter<"DigitalBusinessCard"> | number
    template?: StringFilter<"DigitalBusinessCard"> | string
    qrCodePath?: StringFilter<"DigitalBusinessCard"> | string
    name?: StringFilter<"DigitalBusinessCard"> | string
    title?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    company?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    phone?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    email?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    address?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    website?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    about?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    pronoun?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    accreditations?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    profileUrl?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    theme?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    primaryColor?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    secondaryColor?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    activeFields?: JsonNullableFilter<"DigitalBusinessCard">
    fieldData?: JsonNullableFilter<"DigitalBusinessCard">
    published?: BoolFilter<"DigitalBusinessCard"> | boolean
    createdAt?: DateTimeFilter<"DigitalBusinessCard"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalBusinessCard"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qrCode?: XOR<QRCodeScalarRelationFilter, QRCodeWhereInput>
  }, "id" | "uniqueCode">

  export type DigitalBusinessCardOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    uniqueCode?: SortOrder
    template?: SortOrder
    qrCodePath?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    pronoun?: SortOrderInput | SortOrder
    accreditations?: SortOrderInput | SortOrder
    profileUrl?: SortOrderInput | SortOrder
    theme?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    secondaryColor?: SortOrderInput | SortOrder
    activeFields?: SortOrderInput | SortOrder
    fieldData?: SortOrderInput | SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DigitalBusinessCardCountOrderByAggregateInput
    _avg?: DigitalBusinessCardAvgOrderByAggregateInput
    _max?: DigitalBusinessCardMaxOrderByAggregateInput
    _min?: DigitalBusinessCardMinOrderByAggregateInput
    _sum?: DigitalBusinessCardSumOrderByAggregateInput
  }

  export type DigitalBusinessCardScalarWhereWithAggregatesInput = {
    AND?: DigitalBusinessCardScalarWhereWithAggregatesInput | DigitalBusinessCardScalarWhereWithAggregatesInput[]
    OR?: DigitalBusinessCardScalarWhereWithAggregatesInput[]
    NOT?: DigitalBusinessCardScalarWhereWithAggregatesInput | DigitalBusinessCardScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DigitalBusinessCard"> | number
    userId?: IntWithAggregatesFilter<"DigitalBusinessCard"> | number
    uniqueCode?: StringWithAggregatesFilter<"DigitalBusinessCard"> | string
    template?: StringWithAggregatesFilter<"DigitalBusinessCard"> | string
    qrCodePath?: StringWithAggregatesFilter<"DigitalBusinessCard"> | string
    name?: StringWithAggregatesFilter<"DigitalBusinessCard"> | string
    title?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    company?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    phone?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    email?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    address?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    website?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    about?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    pronoun?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    accreditations?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    profileUrl?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    theme?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    primaryColor?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    secondaryColor?: StringNullableWithAggregatesFilter<"DigitalBusinessCard"> | string | null
    activeFields?: JsonNullableWithAggregatesFilter<"DigitalBusinessCard">
    fieldData?: JsonNullableWithAggregatesFilter<"DigitalBusinessCard">
    published?: BoolWithAggregatesFilter<"DigitalBusinessCard"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DigitalBusinessCard"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DigitalBusinessCard"> | Date | string
  }

  export type UserCreateInput = {
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUsersInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    adminActions?: AdminActionCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionId?: number | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeUncheckedCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    adminActions?: AdminActionUncheckedCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUsersNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUncheckedUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUncheckedUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionId?: number | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
  }

  export type UserUpdateManyMutationInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
  }

  export type AdminUserCreateInput = {
    username: string
    email: string
    password: string
    fullName: string
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: AdminActionCreateNestedManyWithoutAdminInput
  }

  export type AdminUserUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    fullName: string
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    actions?: AdminActionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminUserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: AdminActionUpdateManyWithoutAdminNestedInput
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actions?: AdminActionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type AdminUserCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    fullName: string
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionCreateInput = {
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
    admin: AdminUserCreateNestedOneWithoutActionsInput
    user?: UserCreateNestedOneWithoutAdminActionsInput
  }

  export type AdminActionUncheckedCreateInput = {
    id?: number
    adminId: number
    userId?: number | null
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AdminActionUpdateInput = {
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUserUpdateOneRequiredWithoutActionsNestedInput
    user?: UserUpdateOneWithoutAdminActionsNestedInput
  }

  export type AdminActionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionCreateManyInput = {
    id?: number
    adminId: number
    userId?: number | null
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AdminActionUpdateManyMutationInput = {
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRCodeCreateInput = {
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qrStatus?: boolean
    download_count?: number
    user?: UserCreateNestedOneWithoutQrCodesInput
    scanLogs?: ScanLogCreateNestedManyWithoutQRCodeInput
    downloadLogs?: DownloadLogCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeUncheckedCreateInput = {
    id?: number
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    qrStatus?: boolean
    download_count?: number
    scanLogs?: ScanLogUncheckedCreateNestedManyWithoutQRCodeInput
    downloadLogs?: DownloadLogUncheckedCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeUpdateInput = {
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneWithoutQrCodesNestedInput
    scanLogs?: ScanLogUpdateManyWithoutQRCodeNestedInput
    downloadLogs?: DownloadLogUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUpdateOneWithoutQrCodeNestedInput
  }

  export type QRCodeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    scanLogs?: ScanLogUncheckedUpdateManyWithoutQRCodeNestedInput
    downloadLogs?: DownloadLogUncheckedUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedUpdateOneWithoutQrCodeNestedInput
  }

  export type QRCodeCreateManyInput = {
    id?: number
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    qrStatus?: boolean
    download_count?: number
  }

  export type QRCodeUpdateManyMutationInput = {
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
  }

  export type QRCodeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
  }

  export type ScanLogCreateInput = {
    scanned_at?: Date | string
    ip_address?: string | null
    country?: string | null
    region?: string | null
    city?: string | null
    isp?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    device_type?: string | null
    os_name?: string | null
    browser_name?: string | null
    QRCode: QRCodeCreateNestedOneWithoutScanLogsInput
  }

  export type ScanLogUncheckedCreateInput = {
    scanqr_id?: number
    qr_code_id: number
    scanned_at?: Date | string
    ip_address?: string | null
    country?: string | null
    region?: string | null
    city?: string | null
    isp?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    device_type?: string | null
    os_name?: string | null
    browser_name?: string | null
  }

  export type ScanLogUpdateInput = {
    scanned_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    isp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    device_type?: NullableStringFieldUpdateOperationsInput | string | null
    os_name?: NullableStringFieldUpdateOperationsInput | string | null
    browser_name?: NullableStringFieldUpdateOperationsInput | string | null
    QRCode?: QRCodeUpdateOneRequiredWithoutScanLogsNestedInput
  }

  export type ScanLogUncheckedUpdateInput = {
    scanqr_id?: IntFieldUpdateOperationsInput | number
    qr_code_id?: IntFieldUpdateOperationsInput | number
    scanned_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    isp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    device_type?: NullableStringFieldUpdateOperationsInput | string | null
    os_name?: NullableStringFieldUpdateOperationsInput | string | null
    browser_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanLogCreateManyInput = {
    scanqr_id?: number
    qr_code_id: number
    scanned_at?: Date | string
    ip_address?: string | null
    country?: string | null
    region?: string | null
    city?: string | null
    isp?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    device_type?: string | null
    os_name?: string | null
    browser_name?: string | null
  }

  export type ScanLogUpdateManyMutationInput = {
    scanned_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    isp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    device_type?: NullableStringFieldUpdateOperationsInput | string | null
    os_name?: NullableStringFieldUpdateOperationsInput | string | null
    browser_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanLogUncheckedUpdateManyInput = {
    scanqr_id?: IntFieldUpdateOperationsInput | number
    qr_code_id?: IntFieldUpdateOperationsInput | number
    scanned_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    isp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    device_type?: NullableStringFieldUpdateOperationsInput | string | null
    os_name?: NullableStringFieldUpdateOperationsInput | string | null
    browser_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DownloadLogCreateInput = {
    downloaded_at?: Date | string
    QRCode: QRCodeCreateNestedOneWithoutDownloadLogsInput
  }

  export type DownloadLogUncheckedCreateInput = {
    id?: number
    qr_code_id: number
    downloaded_at?: Date | string
  }

  export type DownloadLogUpdateInput = {
    downloaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
    QRCode?: QRCodeUpdateOneRequiredWithoutDownloadLogsNestedInput
  }

  export type DownloadLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    qr_code_id?: IntFieldUpdateOperationsInput | number
    downloaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogCreateManyInput = {
    id?: number
    qr_code_id: number
    downloaded_at?: Date | string
  }

  export type DownloadLogUpdateManyMutationInput = {
    downloaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    qr_code_id?: IntFieldUpdateOperationsInput | number
    downloaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUpdateLogCreateInput = {
    updated_at?: Date | string
    User: UserCreateNestedOneWithoutProfileUpdateLogsInput
  }

  export type ProfileUpdateLogUncheckedCreateInput = {
    id?: number
    user_id: number
    updated_at?: Date | string
  }

  export type ProfileUpdateLogUpdateInput = {
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutProfileUpdateLogsNestedInput
  }

  export type ProfileUpdateLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUpdateLogCreateManyInput = {
    id?: number
    user_id: number
    updated_at?: Date | string
  }

  export type ProfileUpdateLogUpdateManyMutationInput = {
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUpdateLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutSubscriptionInput
    payments?: PaymentCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutSubscriptionInput
    payments?: PaymentUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutSubscriptionNestedInput
    payments?: PaymentUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutSubscriptionNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionCreateManyInput = {
    id?: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingPlanCreateInput = {
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PricingPlanUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PricingPlanUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingPlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingPlanCreateManyInput = {
    id?: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PricingPlanUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PricingPlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
    subscription: SubscriptionCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    userId: number
    subscriptionId: number
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    subscription?: SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    subscriptionId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    userId: number
    subscriptionId: number
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    subscriptionId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalBusinessCardCreateInput = {
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDigitalBusinessCardsInput
    qrCode?: QRCodeCreateNestedOneWithoutDigitalBusinessCardInput
  }

  export type DigitalBusinessCardUncheckedCreateInput = {
    id?: number
    userId: number
    uniqueCode?: string
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalBusinessCardUpdateInput = {
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDigitalBusinessCardsNestedInput
    qrCode?: QRCodeUpdateOneRequiredWithoutDigitalBusinessCardNestedInput
  }

  export type DigitalBusinessCardUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    uniqueCode?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalBusinessCardCreateManyInput = {
    id?: number
    userId: number
    uniqueCode?: string
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalBusinessCardUpdateManyMutationInput = {
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalBusinessCardUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    uniqueCode?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type QRCodeListRelationFilter = {
    every?: QRCodeWhereInput
    some?: QRCodeWhereInput
    none?: QRCodeWhereInput
  }

  export type ProfileUpdateLogListRelationFilter = {
    every?: ProfileUpdateLogWhereInput
    some?: ProfileUpdateLogWhereInput
    none?: ProfileUpdateLogWhereInput
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type AdminActionListRelationFilter = {
    every?: AdminActionWhereInput
    some?: AdminActionWhereInput
    none?: AdminActionWhereInput
  }

  export type DigitalBusinessCardListRelationFilter = {
    every?: DigitalBusinessCardWhereInput
    some?: DigitalBusinessCardWhereInput
    none?: DigitalBusinessCardWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QRCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfileUpdateLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminActionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DigitalBusinessCardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    location?: SortOrder
    company?: SortOrder
    comp_position?: SortOrder
    usr_phone?: SortOrder
    twoFactorSecret?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorRecoveryCodes?: SortOrder
    emailNotificationsEnabled?: SortOrder
    smsNotificationsEnabled?: SortOrder
    pushNotificationsEnabled?: SortOrder
    feed_rating?: SortOrder
    feed_type?: SortOrder
    feed_msg?: SortOrder
    subscriptionId?: SortOrder
    subscriptionStart?: SortOrder
    subscriptionEnd?: SortOrder
    isActive?: SortOrder
    qrCodesUsed?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    feed_rating?: SortOrder
    subscriptionId?: SortOrder
    qrCodesUsed?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    location?: SortOrder
    company?: SortOrder
    comp_position?: SortOrder
    usr_phone?: SortOrder
    twoFactorSecret?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorRecoveryCodes?: SortOrder
    emailNotificationsEnabled?: SortOrder
    smsNotificationsEnabled?: SortOrder
    pushNotificationsEnabled?: SortOrder
    feed_rating?: SortOrder
    feed_type?: SortOrder
    feed_msg?: SortOrder
    subscriptionId?: SortOrder
    subscriptionStart?: SortOrder
    subscriptionEnd?: SortOrder
    isActive?: SortOrder
    qrCodesUsed?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    location?: SortOrder
    company?: SortOrder
    comp_position?: SortOrder
    usr_phone?: SortOrder
    twoFactorSecret?: SortOrder
    twoFactorEnabled?: SortOrder
    twoFactorRecoveryCodes?: SortOrder
    emailNotificationsEnabled?: SortOrder
    smsNotificationsEnabled?: SortOrder
    pushNotificationsEnabled?: SortOrder
    feed_rating?: SortOrder
    feed_type?: SortOrder
    feed_msg?: SortOrder
    subscriptionId?: SortOrder
    subscriptionStart?: SortOrder
    subscriptionEnd?: SortOrder
    isActive?: SortOrder
    qrCodesUsed?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    feed_rating?: SortOrder
    subscriptionId?: SortOrder
    qrCodesUsed?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AdminUserOrderByRelevanceInput = {
    fields: AdminUserOrderByRelevanceFieldEnum | AdminUserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminUserScalarRelationFilter = {
    is?: AdminUserWhereInput
    isNot?: AdminUserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AdminActionOrderByRelevanceInput = {
    fields: AdminActionOrderByRelevanceFieldEnum | AdminActionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AdminActionCountOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminActionAvgOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    userId?: SortOrder
  }

  export type AdminActionMaxOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminActionMinOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    description?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    createdAt?: SortOrder
  }

  export type AdminActionSumOrderByAggregateInput = {
    id?: SortOrder
    adminId?: SortOrder
    userId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ScanLogListRelationFilter = {
    every?: ScanLogWhereInput
    some?: ScanLogWhereInput
    none?: ScanLogWhereInput
  }

  export type DownloadLogListRelationFilter = {
    every?: DownloadLogWhereInput
    some?: DownloadLogWhereInput
    none?: DownloadLogWhereInput
  }

  export type DigitalBusinessCardNullableScalarRelationFilter = {
    is?: DigitalBusinessCardWhereInput | null
    isNot?: DigitalBusinessCardWhereInput | null
  }

  export type ScanLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DownloadLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QRCodeOrderByRelevanceInput = {
    fields: QRCodeOrderByRelevanceFieldEnum | QRCodeOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type QRCodeCountOrderByAggregateInput = {
    id?: SortOrder
    qrData?: SortOrder
    lastLink?: SortOrder
    uniqueCode?: SortOrder
    cornerShape?: SortOrder
    eyeShape?: SortOrder
    qrShape?: SortOrder
    foregroundColor?: SortOrder
    backgroundColor?: SortOrder
    dotColor?: SortOrder
    cornerColor?: SortOrder
    eyeColor?: SortOrder
    updateCount?: SortOrder
    qrCodeImagePath?: SortOrder
    logoPath?: SortOrder
    frameStyle?: SortOrder
    frameText?: SortOrder
    frameTextSize?: SortOrder
    frameColor?: SortOrder
    frameTextColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    qrStatus?: SortOrder
    download_count?: SortOrder
  }

  export type QRCodeAvgOrderByAggregateInput = {
    id?: SortOrder
    updateCount?: SortOrder
    userId?: SortOrder
    download_count?: SortOrder
  }

  export type QRCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    lastLink?: SortOrder
    uniqueCode?: SortOrder
    cornerShape?: SortOrder
    eyeShape?: SortOrder
    qrShape?: SortOrder
    foregroundColor?: SortOrder
    backgroundColor?: SortOrder
    dotColor?: SortOrder
    cornerColor?: SortOrder
    eyeColor?: SortOrder
    updateCount?: SortOrder
    qrCodeImagePath?: SortOrder
    logoPath?: SortOrder
    frameStyle?: SortOrder
    frameText?: SortOrder
    frameTextSize?: SortOrder
    frameColor?: SortOrder
    frameTextColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    qrStatus?: SortOrder
    download_count?: SortOrder
  }

  export type QRCodeMinOrderByAggregateInput = {
    id?: SortOrder
    lastLink?: SortOrder
    uniqueCode?: SortOrder
    cornerShape?: SortOrder
    eyeShape?: SortOrder
    qrShape?: SortOrder
    foregroundColor?: SortOrder
    backgroundColor?: SortOrder
    dotColor?: SortOrder
    cornerColor?: SortOrder
    eyeColor?: SortOrder
    updateCount?: SortOrder
    qrCodeImagePath?: SortOrder
    logoPath?: SortOrder
    frameStyle?: SortOrder
    frameText?: SortOrder
    frameTextSize?: SortOrder
    frameColor?: SortOrder
    frameTextColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    qrStatus?: SortOrder
    download_count?: SortOrder
  }

  export type QRCodeSumOrderByAggregateInput = {
    id?: SortOrder
    updateCount?: SortOrder
    userId?: SortOrder
    download_count?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type QRCodeScalarRelationFilter = {
    is?: QRCodeWhereInput
    isNot?: QRCodeWhereInput
  }

  export type ScanLogOrderByRelevanceInput = {
    fields: ScanLogOrderByRelevanceFieldEnum | ScanLogOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ScanLogCountOrderByAggregateInput = {
    scanqr_id?: SortOrder
    qr_code_id?: SortOrder
    scanned_at?: SortOrder
    ip_address?: SortOrder
    country?: SortOrder
    region?: SortOrder
    city?: SortOrder
    isp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    device_type?: SortOrder
    os_name?: SortOrder
    browser_name?: SortOrder
  }

  export type ScanLogAvgOrderByAggregateInput = {
    scanqr_id?: SortOrder
    qr_code_id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type ScanLogMaxOrderByAggregateInput = {
    scanqr_id?: SortOrder
    qr_code_id?: SortOrder
    scanned_at?: SortOrder
    ip_address?: SortOrder
    country?: SortOrder
    region?: SortOrder
    city?: SortOrder
    isp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    device_type?: SortOrder
    os_name?: SortOrder
    browser_name?: SortOrder
  }

  export type ScanLogMinOrderByAggregateInput = {
    scanqr_id?: SortOrder
    qr_code_id?: SortOrder
    scanned_at?: SortOrder
    ip_address?: SortOrder
    country?: SortOrder
    region?: SortOrder
    city?: SortOrder
    isp?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    device_type?: SortOrder
    os_name?: SortOrder
    browser_name?: SortOrder
  }

  export type ScanLogSumOrderByAggregateInput = {
    scanqr_id?: SortOrder
    qr_code_id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type DownloadLogCountOrderByAggregateInput = {
    id?: SortOrder
    qr_code_id?: SortOrder
    downloaded_at?: SortOrder
  }

  export type DownloadLogAvgOrderByAggregateInput = {
    id?: SortOrder
    qr_code_id?: SortOrder
  }

  export type DownloadLogMaxOrderByAggregateInput = {
    id?: SortOrder
    qr_code_id?: SortOrder
    downloaded_at?: SortOrder
  }

  export type DownloadLogMinOrderByAggregateInput = {
    id?: SortOrder
    qr_code_id?: SortOrder
    downloaded_at?: SortOrder
  }

  export type DownloadLogSumOrderByAggregateInput = {
    id?: SortOrder
    qr_code_id?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProfileUpdateLogCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileUpdateLogAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type ProfileUpdateLogMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileUpdateLogMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    updated_at?: SortOrder
  }

  export type ProfileUpdateLogSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriptionOrderByRelevanceInput = {
    fields: SubscriptionOrderByRelevanceFieldEnum | SubscriptionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionAvgOrderByAggregateInput = {
    id?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionSumOrderByAggregateInput = {
    id?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type PricingPlanOrderByRelevanceInput = {
    fields: PricingPlanOrderByRelevanceFieldEnum | PricingPlanOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PricingPlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingPlanAvgOrderByAggregateInput = {
    id?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type PricingPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingPlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PricingPlanSumOrderByAggregateInput = {
    id?: SortOrder
    priceMonthly?: SortOrder
    priceYearly?: SortOrder
    qrCodesLimit?: SortOrder
  }

  export type SubscriptionScalarRelationFilter = {
    is?: SubscriptionWhereInput
    isNot?: SubscriptionWhereInput
  }

  export type PaymentOrderByRelevanceInput = {
    fields: PaymentOrderByRelevanceFieldEnum | PaymentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    transactionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    subscriptionId?: SortOrder
    amount?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DigitalBusinessCardOrderByRelevanceInput = {
    fields: DigitalBusinessCardOrderByRelevanceFieldEnum | DigitalBusinessCardOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type DigitalBusinessCardCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    uniqueCode?: SortOrder
    template?: SortOrder
    qrCodePath?: SortOrder
    name?: SortOrder
    title?: SortOrder
    company?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    website?: SortOrder
    about?: SortOrder
    pronoun?: SortOrder
    accreditations?: SortOrder
    profileUrl?: SortOrder
    theme?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    activeFields?: SortOrder
    fieldData?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalBusinessCardAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type DigitalBusinessCardMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    uniqueCode?: SortOrder
    template?: SortOrder
    qrCodePath?: SortOrder
    name?: SortOrder
    title?: SortOrder
    company?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    website?: SortOrder
    about?: SortOrder
    pronoun?: SortOrder
    accreditations?: SortOrder
    profileUrl?: SortOrder
    theme?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalBusinessCardMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    uniqueCode?: SortOrder
    template?: SortOrder
    qrCodePath?: SortOrder
    name?: SortOrder
    title?: SortOrder
    company?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    website?: SortOrder
    about?: SortOrder
    pronoun?: SortOrder
    accreditations?: SortOrder
    profileUrl?: SortOrder
    theme?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DigitalBusinessCardSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type QRCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<QRCodeCreateWithoutUserInput, QRCodeUncheckedCreateWithoutUserInput> | QRCodeCreateWithoutUserInput[] | QRCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QRCodeCreateOrConnectWithoutUserInput | QRCodeCreateOrConnectWithoutUserInput[]
    createMany?: QRCodeCreateManyUserInputEnvelope
    connect?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
  }

  export type ProfileUpdateLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfileUpdateLogCreateWithoutUserInput, ProfileUpdateLogUncheckedCreateWithoutUserInput> | ProfileUpdateLogCreateWithoutUserInput[] | ProfileUpdateLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileUpdateLogCreateOrConnectWithoutUserInput | ProfileUpdateLogCreateOrConnectWithoutUserInput[]
    createMany?: ProfileUpdateLogCreateManyUserInputEnvelope
    connect?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
  }

  export type SubscriptionCreateNestedOneWithoutUsersInput = {
    create?: XOR<SubscriptionCreateWithoutUsersInput, SubscriptionUncheckedCreateWithoutUsersInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUsersInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type AdminActionCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminActionCreateWithoutUserInput, AdminActionUncheckedCreateWithoutUserInput> | AdminActionCreateWithoutUserInput[] | AdminActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutUserInput | AdminActionCreateOrConnectWithoutUserInput[]
    createMany?: AdminActionCreateManyUserInputEnvelope
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
  }

  export type DigitalBusinessCardCreateNestedManyWithoutUserInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutUserInput, DigitalBusinessCardUncheckedCreateWithoutUserInput> | DigitalBusinessCardCreateWithoutUserInput[] | DigitalBusinessCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutUserInput | DigitalBusinessCardCreateOrConnectWithoutUserInput[]
    createMany?: DigitalBusinessCardCreateManyUserInputEnvelope
    connect?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
  }

  export type QRCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<QRCodeCreateWithoutUserInput, QRCodeUncheckedCreateWithoutUserInput> | QRCodeCreateWithoutUserInput[] | QRCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QRCodeCreateOrConnectWithoutUserInput | QRCodeCreateOrConnectWithoutUserInput[]
    createMany?: QRCodeCreateManyUserInputEnvelope
    connect?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
  }

  export type ProfileUpdateLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProfileUpdateLogCreateWithoutUserInput, ProfileUpdateLogUncheckedCreateWithoutUserInput> | ProfileUpdateLogCreateWithoutUserInput[] | ProfileUpdateLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileUpdateLogCreateOrConnectWithoutUserInput | ProfileUpdateLogCreateOrConnectWithoutUserInput[]
    createMany?: ProfileUpdateLogCreateManyUserInputEnvelope
    connect?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type AdminActionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AdminActionCreateWithoutUserInput, AdminActionUncheckedCreateWithoutUserInput> | AdminActionCreateWithoutUserInput[] | AdminActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutUserInput | AdminActionCreateOrConnectWithoutUserInput[]
    createMany?: AdminActionCreateManyUserInputEnvelope
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
  }

  export type DigitalBusinessCardUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutUserInput, DigitalBusinessCardUncheckedCreateWithoutUserInput> | DigitalBusinessCardCreateWithoutUserInput[] | DigitalBusinessCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutUserInput | DigitalBusinessCardCreateOrConnectWithoutUserInput[]
    createMany?: DigitalBusinessCardCreateManyUserInputEnvelope
    connect?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type QRCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<QRCodeCreateWithoutUserInput, QRCodeUncheckedCreateWithoutUserInput> | QRCodeCreateWithoutUserInput[] | QRCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QRCodeCreateOrConnectWithoutUserInput | QRCodeCreateOrConnectWithoutUserInput[]
    upsert?: QRCodeUpsertWithWhereUniqueWithoutUserInput | QRCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QRCodeCreateManyUserInputEnvelope
    set?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    disconnect?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    delete?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    connect?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    update?: QRCodeUpdateWithWhereUniqueWithoutUserInput | QRCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QRCodeUpdateManyWithWhereWithoutUserInput | QRCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QRCodeScalarWhereInput | QRCodeScalarWhereInput[]
  }

  export type ProfileUpdateLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfileUpdateLogCreateWithoutUserInput, ProfileUpdateLogUncheckedCreateWithoutUserInput> | ProfileUpdateLogCreateWithoutUserInput[] | ProfileUpdateLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileUpdateLogCreateOrConnectWithoutUserInput | ProfileUpdateLogCreateOrConnectWithoutUserInput[]
    upsert?: ProfileUpdateLogUpsertWithWhereUniqueWithoutUserInput | ProfileUpdateLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfileUpdateLogCreateManyUserInputEnvelope
    set?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    disconnect?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    delete?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    connect?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    update?: ProfileUpdateLogUpdateWithWhereUniqueWithoutUserInput | ProfileUpdateLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfileUpdateLogUpdateManyWithWhereWithoutUserInput | ProfileUpdateLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfileUpdateLogScalarWhereInput | ProfileUpdateLogScalarWhereInput[]
  }

  export type SubscriptionUpdateOneWithoutUsersNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUsersInput, SubscriptionUncheckedCreateWithoutUsersInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUsersInput
    upsert?: SubscriptionUpsertWithoutUsersInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUsersInput, SubscriptionUpdateWithoutUsersInput>, SubscriptionUncheckedUpdateWithoutUsersInput>
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type AdminActionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminActionCreateWithoutUserInput, AdminActionUncheckedCreateWithoutUserInput> | AdminActionCreateWithoutUserInput[] | AdminActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutUserInput | AdminActionCreateOrConnectWithoutUserInput[]
    upsert?: AdminActionUpsertWithWhereUniqueWithoutUserInput | AdminActionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminActionCreateManyUserInputEnvelope
    set?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    disconnect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    delete?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    update?: AdminActionUpdateWithWhereUniqueWithoutUserInput | AdminActionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminActionUpdateManyWithWhereWithoutUserInput | AdminActionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminActionScalarWhereInput | AdminActionScalarWhereInput[]
  }

  export type DigitalBusinessCardUpdateManyWithoutUserNestedInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutUserInput, DigitalBusinessCardUncheckedCreateWithoutUserInput> | DigitalBusinessCardCreateWithoutUserInput[] | DigitalBusinessCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutUserInput | DigitalBusinessCardCreateOrConnectWithoutUserInput[]
    upsert?: DigitalBusinessCardUpsertWithWhereUniqueWithoutUserInput | DigitalBusinessCardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DigitalBusinessCardCreateManyUserInputEnvelope
    set?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    disconnect?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    delete?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    connect?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    update?: DigitalBusinessCardUpdateWithWhereUniqueWithoutUserInput | DigitalBusinessCardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DigitalBusinessCardUpdateManyWithWhereWithoutUserInput | DigitalBusinessCardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DigitalBusinessCardScalarWhereInput | DigitalBusinessCardScalarWhereInput[]
  }

  export type QRCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<QRCodeCreateWithoutUserInput, QRCodeUncheckedCreateWithoutUserInput> | QRCodeCreateWithoutUserInput[] | QRCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: QRCodeCreateOrConnectWithoutUserInput | QRCodeCreateOrConnectWithoutUserInput[]
    upsert?: QRCodeUpsertWithWhereUniqueWithoutUserInput | QRCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: QRCodeCreateManyUserInputEnvelope
    set?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    disconnect?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    delete?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    connect?: QRCodeWhereUniqueInput | QRCodeWhereUniqueInput[]
    update?: QRCodeUpdateWithWhereUniqueWithoutUserInput | QRCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: QRCodeUpdateManyWithWhereWithoutUserInput | QRCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: QRCodeScalarWhereInput | QRCodeScalarWhereInput[]
  }

  export type ProfileUpdateLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProfileUpdateLogCreateWithoutUserInput, ProfileUpdateLogUncheckedCreateWithoutUserInput> | ProfileUpdateLogCreateWithoutUserInput[] | ProfileUpdateLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProfileUpdateLogCreateOrConnectWithoutUserInput | ProfileUpdateLogCreateOrConnectWithoutUserInput[]
    upsert?: ProfileUpdateLogUpsertWithWhereUniqueWithoutUserInput | ProfileUpdateLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProfileUpdateLogCreateManyUserInputEnvelope
    set?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    disconnect?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    delete?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    connect?: ProfileUpdateLogWhereUniqueInput | ProfileUpdateLogWhereUniqueInput[]
    update?: ProfileUpdateLogUpdateWithWhereUniqueWithoutUserInput | ProfileUpdateLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProfileUpdateLogUpdateManyWithWhereWithoutUserInput | ProfileUpdateLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProfileUpdateLogScalarWhereInput | ProfileUpdateLogScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type AdminActionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AdminActionCreateWithoutUserInput, AdminActionUncheckedCreateWithoutUserInput> | AdminActionCreateWithoutUserInput[] | AdminActionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutUserInput | AdminActionCreateOrConnectWithoutUserInput[]
    upsert?: AdminActionUpsertWithWhereUniqueWithoutUserInput | AdminActionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AdminActionCreateManyUserInputEnvelope
    set?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    disconnect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    delete?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    update?: AdminActionUpdateWithWhereUniqueWithoutUserInput | AdminActionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AdminActionUpdateManyWithWhereWithoutUserInput | AdminActionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AdminActionScalarWhereInput | AdminActionScalarWhereInput[]
  }

  export type DigitalBusinessCardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutUserInput, DigitalBusinessCardUncheckedCreateWithoutUserInput> | DigitalBusinessCardCreateWithoutUserInput[] | DigitalBusinessCardUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutUserInput | DigitalBusinessCardCreateOrConnectWithoutUserInput[]
    upsert?: DigitalBusinessCardUpsertWithWhereUniqueWithoutUserInput | DigitalBusinessCardUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DigitalBusinessCardCreateManyUserInputEnvelope
    set?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    disconnect?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    delete?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    connect?: DigitalBusinessCardWhereUniqueInput | DigitalBusinessCardWhereUniqueInput[]
    update?: DigitalBusinessCardUpdateWithWhereUniqueWithoutUserInput | DigitalBusinessCardUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DigitalBusinessCardUpdateManyWithWhereWithoutUserInput | DigitalBusinessCardUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DigitalBusinessCardScalarWhereInput | DigitalBusinessCardScalarWhereInput[]
  }

  export type AdminActionCreateNestedManyWithoutAdminInput = {
    create?: XOR<AdminActionCreateWithoutAdminInput, AdminActionUncheckedCreateWithoutAdminInput> | AdminActionCreateWithoutAdminInput[] | AdminActionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutAdminInput | AdminActionCreateOrConnectWithoutAdminInput[]
    createMany?: AdminActionCreateManyAdminInputEnvelope
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
  }

  export type AdminActionUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<AdminActionCreateWithoutAdminInput, AdminActionUncheckedCreateWithoutAdminInput> | AdminActionCreateWithoutAdminInput[] | AdminActionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutAdminInput | AdminActionCreateOrConnectWithoutAdminInput[]
    createMany?: AdminActionCreateManyAdminInputEnvelope
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
  }

  export type AdminActionUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AdminActionCreateWithoutAdminInput, AdminActionUncheckedCreateWithoutAdminInput> | AdminActionCreateWithoutAdminInput[] | AdminActionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutAdminInput | AdminActionCreateOrConnectWithoutAdminInput[]
    upsert?: AdminActionUpsertWithWhereUniqueWithoutAdminInput | AdminActionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AdminActionCreateManyAdminInputEnvelope
    set?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    disconnect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    delete?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    update?: AdminActionUpdateWithWhereUniqueWithoutAdminInput | AdminActionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AdminActionUpdateManyWithWhereWithoutAdminInput | AdminActionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AdminActionScalarWhereInput | AdminActionScalarWhereInput[]
  }

  export type AdminActionUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AdminActionCreateWithoutAdminInput, AdminActionUncheckedCreateWithoutAdminInput> | AdminActionCreateWithoutAdminInput[] | AdminActionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminActionCreateOrConnectWithoutAdminInput | AdminActionCreateOrConnectWithoutAdminInput[]
    upsert?: AdminActionUpsertWithWhereUniqueWithoutAdminInput | AdminActionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AdminActionCreateManyAdminInputEnvelope
    set?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    disconnect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    delete?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    connect?: AdminActionWhereUniqueInput | AdminActionWhereUniqueInput[]
    update?: AdminActionUpdateWithWhereUniqueWithoutAdminInput | AdminActionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AdminActionUpdateManyWithWhereWithoutAdminInput | AdminActionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AdminActionScalarWhereInput | AdminActionScalarWhereInput[]
  }

  export type AdminUserCreateNestedOneWithoutActionsInput = {
    create?: XOR<AdminUserCreateWithoutActionsInput, AdminUserUncheckedCreateWithoutActionsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutActionsInput
    connect?: AdminUserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAdminActionsInput = {
    create?: XOR<UserCreateWithoutAdminActionsInput, UserUncheckedCreateWithoutAdminActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminActionsInput
    connect?: UserWhereUniqueInput
  }

  export type AdminUserUpdateOneRequiredWithoutActionsNestedInput = {
    create?: XOR<AdminUserCreateWithoutActionsInput, AdminUserUncheckedCreateWithoutActionsInput>
    connectOrCreate?: AdminUserCreateOrConnectWithoutActionsInput
    upsert?: AdminUserUpsertWithoutActionsInput
    connect?: AdminUserWhereUniqueInput
    update?: XOR<XOR<AdminUserUpdateToOneWithWhereWithoutActionsInput, AdminUserUpdateWithoutActionsInput>, AdminUserUncheckedUpdateWithoutActionsInput>
  }

  export type UserUpdateOneWithoutAdminActionsNestedInput = {
    create?: XOR<UserCreateWithoutAdminActionsInput, UserUncheckedCreateWithoutAdminActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAdminActionsInput
    upsert?: UserUpsertWithoutAdminActionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAdminActionsInput, UserUpdateWithoutAdminActionsInput>, UserUncheckedUpdateWithoutAdminActionsInput>
  }

  export type UserCreateNestedOneWithoutQrCodesInput = {
    create?: XOR<UserCreateWithoutQrCodesInput, UserUncheckedCreateWithoutQrCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQrCodesInput
    connect?: UserWhereUniqueInput
  }

  export type ScanLogCreateNestedManyWithoutQRCodeInput = {
    create?: XOR<ScanLogCreateWithoutQRCodeInput, ScanLogUncheckedCreateWithoutQRCodeInput> | ScanLogCreateWithoutQRCodeInput[] | ScanLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: ScanLogCreateOrConnectWithoutQRCodeInput | ScanLogCreateOrConnectWithoutQRCodeInput[]
    createMany?: ScanLogCreateManyQRCodeInputEnvelope
    connect?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
  }

  export type DownloadLogCreateNestedManyWithoutQRCodeInput = {
    create?: XOR<DownloadLogCreateWithoutQRCodeInput, DownloadLogUncheckedCreateWithoutQRCodeInput> | DownloadLogCreateWithoutQRCodeInput[] | DownloadLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutQRCodeInput | DownloadLogCreateOrConnectWithoutQRCodeInput[]
    createMany?: DownloadLogCreateManyQRCodeInputEnvelope
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
  }

  export type DigitalBusinessCardCreateNestedOneWithoutQrCodeInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutQrCodeInput, DigitalBusinessCardUncheckedCreateWithoutQrCodeInput>
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutQrCodeInput
    connect?: DigitalBusinessCardWhereUniqueInput
  }

  export type ScanLogUncheckedCreateNestedManyWithoutQRCodeInput = {
    create?: XOR<ScanLogCreateWithoutQRCodeInput, ScanLogUncheckedCreateWithoutQRCodeInput> | ScanLogCreateWithoutQRCodeInput[] | ScanLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: ScanLogCreateOrConnectWithoutQRCodeInput | ScanLogCreateOrConnectWithoutQRCodeInput[]
    createMany?: ScanLogCreateManyQRCodeInputEnvelope
    connect?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
  }

  export type DownloadLogUncheckedCreateNestedManyWithoutQRCodeInput = {
    create?: XOR<DownloadLogCreateWithoutQRCodeInput, DownloadLogUncheckedCreateWithoutQRCodeInput> | DownloadLogCreateWithoutQRCodeInput[] | DownloadLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutQRCodeInput | DownloadLogCreateOrConnectWithoutQRCodeInput[]
    createMany?: DownloadLogCreateManyQRCodeInputEnvelope
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
  }

  export type DigitalBusinessCardUncheckedCreateNestedOneWithoutQrCodeInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutQrCodeInput, DigitalBusinessCardUncheckedCreateWithoutQrCodeInput>
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutQrCodeInput
    connect?: DigitalBusinessCardWhereUniqueInput
  }

  export type UserUpdateOneWithoutQrCodesNestedInput = {
    create?: XOR<UserCreateWithoutQrCodesInput, UserUncheckedCreateWithoutQrCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutQrCodesInput
    upsert?: UserUpsertWithoutQrCodesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutQrCodesInput, UserUpdateWithoutQrCodesInput>, UserUncheckedUpdateWithoutQrCodesInput>
  }

  export type ScanLogUpdateManyWithoutQRCodeNestedInput = {
    create?: XOR<ScanLogCreateWithoutQRCodeInput, ScanLogUncheckedCreateWithoutQRCodeInput> | ScanLogCreateWithoutQRCodeInput[] | ScanLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: ScanLogCreateOrConnectWithoutQRCodeInput | ScanLogCreateOrConnectWithoutQRCodeInput[]
    upsert?: ScanLogUpsertWithWhereUniqueWithoutQRCodeInput | ScanLogUpsertWithWhereUniqueWithoutQRCodeInput[]
    createMany?: ScanLogCreateManyQRCodeInputEnvelope
    set?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    disconnect?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    delete?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    connect?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    update?: ScanLogUpdateWithWhereUniqueWithoutQRCodeInput | ScanLogUpdateWithWhereUniqueWithoutQRCodeInput[]
    updateMany?: ScanLogUpdateManyWithWhereWithoutQRCodeInput | ScanLogUpdateManyWithWhereWithoutQRCodeInput[]
    deleteMany?: ScanLogScalarWhereInput | ScanLogScalarWhereInput[]
  }

  export type DownloadLogUpdateManyWithoutQRCodeNestedInput = {
    create?: XOR<DownloadLogCreateWithoutQRCodeInput, DownloadLogUncheckedCreateWithoutQRCodeInput> | DownloadLogCreateWithoutQRCodeInput[] | DownloadLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutQRCodeInput | DownloadLogCreateOrConnectWithoutQRCodeInput[]
    upsert?: DownloadLogUpsertWithWhereUniqueWithoutQRCodeInput | DownloadLogUpsertWithWhereUniqueWithoutQRCodeInput[]
    createMany?: DownloadLogCreateManyQRCodeInputEnvelope
    set?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    disconnect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    delete?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    update?: DownloadLogUpdateWithWhereUniqueWithoutQRCodeInput | DownloadLogUpdateWithWhereUniqueWithoutQRCodeInput[]
    updateMany?: DownloadLogUpdateManyWithWhereWithoutQRCodeInput | DownloadLogUpdateManyWithWhereWithoutQRCodeInput[]
    deleteMany?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
  }

  export type DigitalBusinessCardUpdateOneWithoutQrCodeNestedInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutQrCodeInput, DigitalBusinessCardUncheckedCreateWithoutQrCodeInput>
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutQrCodeInput
    upsert?: DigitalBusinessCardUpsertWithoutQrCodeInput
    disconnect?: DigitalBusinessCardWhereInput | boolean
    delete?: DigitalBusinessCardWhereInput | boolean
    connect?: DigitalBusinessCardWhereUniqueInput
    update?: XOR<XOR<DigitalBusinessCardUpdateToOneWithWhereWithoutQrCodeInput, DigitalBusinessCardUpdateWithoutQrCodeInput>, DigitalBusinessCardUncheckedUpdateWithoutQrCodeInput>
  }

  export type ScanLogUncheckedUpdateManyWithoutQRCodeNestedInput = {
    create?: XOR<ScanLogCreateWithoutQRCodeInput, ScanLogUncheckedCreateWithoutQRCodeInput> | ScanLogCreateWithoutQRCodeInput[] | ScanLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: ScanLogCreateOrConnectWithoutQRCodeInput | ScanLogCreateOrConnectWithoutQRCodeInput[]
    upsert?: ScanLogUpsertWithWhereUniqueWithoutQRCodeInput | ScanLogUpsertWithWhereUniqueWithoutQRCodeInput[]
    createMany?: ScanLogCreateManyQRCodeInputEnvelope
    set?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    disconnect?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    delete?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    connect?: ScanLogWhereUniqueInput | ScanLogWhereUniqueInput[]
    update?: ScanLogUpdateWithWhereUniqueWithoutQRCodeInput | ScanLogUpdateWithWhereUniqueWithoutQRCodeInput[]
    updateMany?: ScanLogUpdateManyWithWhereWithoutQRCodeInput | ScanLogUpdateManyWithWhereWithoutQRCodeInput[]
    deleteMany?: ScanLogScalarWhereInput | ScanLogScalarWhereInput[]
  }

  export type DownloadLogUncheckedUpdateManyWithoutQRCodeNestedInput = {
    create?: XOR<DownloadLogCreateWithoutQRCodeInput, DownloadLogUncheckedCreateWithoutQRCodeInput> | DownloadLogCreateWithoutQRCodeInput[] | DownloadLogUncheckedCreateWithoutQRCodeInput[]
    connectOrCreate?: DownloadLogCreateOrConnectWithoutQRCodeInput | DownloadLogCreateOrConnectWithoutQRCodeInput[]
    upsert?: DownloadLogUpsertWithWhereUniqueWithoutQRCodeInput | DownloadLogUpsertWithWhereUniqueWithoutQRCodeInput[]
    createMany?: DownloadLogCreateManyQRCodeInputEnvelope
    set?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    disconnect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    delete?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    connect?: DownloadLogWhereUniqueInput | DownloadLogWhereUniqueInput[]
    update?: DownloadLogUpdateWithWhereUniqueWithoutQRCodeInput | DownloadLogUpdateWithWhereUniqueWithoutQRCodeInput[]
    updateMany?: DownloadLogUpdateManyWithWhereWithoutQRCodeInput | DownloadLogUpdateManyWithWhereWithoutQRCodeInput[]
    deleteMany?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
  }

  export type DigitalBusinessCardUncheckedUpdateOneWithoutQrCodeNestedInput = {
    create?: XOR<DigitalBusinessCardCreateWithoutQrCodeInput, DigitalBusinessCardUncheckedCreateWithoutQrCodeInput>
    connectOrCreate?: DigitalBusinessCardCreateOrConnectWithoutQrCodeInput
    upsert?: DigitalBusinessCardUpsertWithoutQrCodeInput
    disconnect?: DigitalBusinessCardWhereInput | boolean
    delete?: DigitalBusinessCardWhereInput | boolean
    connect?: DigitalBusinessCardWhereUniqueInput
    update?: XOR<XOR<DigitalBusinessCardUpdateToOneWithWhereWithoutQrCodeInput, DigitalBusinessCardUpdateWithoutQrCodeInput>, DigitalBusinessCardUncheckedUpdateWithoutQrCodeInput>
  }

  export type QRCodeCreateNestedOneWithoutScanLogsInput = {
    create?: XOR<QRCodeCreateWithoutScanLogsInput, QRCodeUncheckedCreateWithoutScanLogsInput>
    connectOrCreate?: QRCodeCreateOrConnectWithoutScanLogsInput
    connect?: QRCodeWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type QRCodeUpdateOneRequiredWithoutScanLogsNestedInput = {
    create?: XOR<QRCodeCreateWithoutScanLogsInput, QRCodeUncheckedCreateWithoutScanLogsInput>
    connectOrCreate?: QRCodeCreateOrConnectWithoutScanLogsInput
    upsert?: QRCodeUpsertWithoutScanLogsInput
    connect?: QRCodeWhereUniqueInput
    update?: XOR<XOR<QRCodeUpdateToOneWithWhereWithoutScanLogsInput, QRCodeUpdateWithoutScanLogsInput>, QRCodeUncheckedUpdateWithoutScanLogsInput>
  }

  export type QRCodeCreateNestedOneWithoutDownloadLogsInput = {
    create?: XOR<QRCodeCreateWithoutDownloadLogsInput, QRCodeUncheckedCreateWithoutDownloadLogsInput>
    connectOrCreate?: QRCodeCreateOrConnectWithoutDownloadLogsInput
    connect?: QRCodeWhereUniqueInput
  }

  export type QRCodeUpdateOneRequiredWithoutDownloadLogsNestedInput = {
    create?: XOR<QRCodeCreateWithoutDownloadLogsInput, QRCodeUncheckedCreateWithoutDownloadLogsInput>
    connectOrCreate?: QRCodeCreateOrConnectWithoutDownloadLogsInput
    upsert?: QRCodeUpsertWithoutDownloadLogsInput
    connect?: QRCodeWhereUniqueInput
    update?: XOR<XOR<QRCodeUpdateToOneWithWhereWithoutDownloadLogsInput, QRCodeUpdateWithoutDownloadLogsInput>, QRCodeUncheckedUpdateWithoutDownloadLogsInput>
  }

  export type UserCreateNestedOneWithoutProfileUpdateLogsInput = {
    create?: XOR<UserCreateWithoutProfileUpdateLogsInput, UserUncheckedCreateWithoutProfileUpdateLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileUpdateLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutProfileUpdateLogsNestedInput = {
    create?: XOR<UserCreateWithoutProfileUpdateLogsInput, UserUncheckedCreateWithoutProfileUpdateLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileUpdateLogsInput
    upsert?: UserUpsertWithoutProfileUpdateLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileUpdateLogsInput, UserUpdateWithoutProfileUpdateLogsInput>, UserUncheckedUpdateWithoutProfileUpdateLogsInput>
  }

  export type UserCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput> | UserCreateWithoutSubscriptionInput[] | UserUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput | UserCreateOrConnectWithoutSubscriptionInput[]
    createMany?: UserCreateManySubscriptionInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput> | UserCreateWithoutSubscriptionInput[] | UserUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput | UserCreateOrConnectWithoutSubscriptionInput[]
    createMany?: UserCreateManySubscriptionInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutSubscriptionInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput> | UserCreateWithoutSubscriptionInput[] | UserUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput | UserCreateOrConnectWithoutSubscriptionInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSubscriptionInput | UserUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: UserCreateManySubscriptionInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSubscriptionInput | UserUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSubscriptionInput | UserUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSubscriptionInput | PaymentUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput> | UserCreateWithoutSubscriptionInput[] | UserUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput | UserCreateOrConnectWithoutSubscriptionInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSubscriptionInput | UserUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: UserCreateManySubscriptionInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSubscriptionInput | UserUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSubscriptionInput | UserUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput = {
    create?: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput> | PaymentCreateWithoutSubscriptionInput[] | PaymentUncheckedCreateWithoutSubscriptionInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutSubscriptionInput | PaymentCreateOrConnectWithoutSubscriptionInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutSubscriptionInput | PaymentUpsertWithWhereUniqueWithoutSubscriptionInput[]
    createMany?: PaymentCreateManySubscriptionInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutSubscriptionInput | PaymentUpdateWithWhereUniqueWithoutSubscriptionInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutSubscriptionInput | PaymentUpdateManyWithWhereWithoutSubscriptionInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type SubscriptionCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPaymentsInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutPaymentsInput
    upsert?: SubscriptionUpsertWithoutPaymentsInput
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutPaymentsInput, SubscriptionUpdateWithoutPaymentsInput>, SubscriptionUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserCreateNestedOneWithoutDigitalBusinessCardsInput = {
    create?: XOR<UserCreateWithoutDigitalBusinessCardsInput, UserUncheckedCreateWithoutDigitalBusinessCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDigitalBusinessCardsInput
    connect?: UserWhereUniqueInput
  }

  export type QRCodeCreateNestedOneWithoutDigitalBusinessCardInput = {
    create?: XOR<QRCodeCreateWithoutDigitalBusinessCardInput, QRCodeUncheckedCreateWithoutDigitalBusinessCardInput>
    connectOrCreate?: QRCodeCreateOrConnectWithoutDigitalBusinessCardInput
    connect?: QRCodeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDigitalBusinessCardsNestedInput = {
    create?: XOR<UserCreateWithoutDigitalBusinessCardsInput, UserUncheckedCreateWithoutDigitalBusinessCardsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDigitalBusinessCardsInput
    upsert?: UserUpsertWithoutDigitalBusinessCardsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDigitalBusinessCardsInput, UserUpdateWithoutDigitalBusinessCardsInput>, UserUncheckedUpdateWithoutDigitalBusinessCardsInput>
  }

  export type QRCodeUpdateOneRequiredWithoutDigitalBusinessCardNestedInput = {
    create?: XOR<QRCodeCreateWithoutDigitalBusinessCardInput, QRCodeUncheckedCreateWithoutDigitalBusinessCardInput>
    connectOrCreate?: QRCodeCreateOrConnectWithoutDigitalBusinessCardInput
    upsert?: QRCodeUpsertWithoutDigitalBusinessCardInput
    connect?: QRCodeWhereUniqueInput
    update?: XOR<XOR<QRCodeUpdateToOneWithWhereWithoutDigitalBusinessCardInput, QRCodeUpdateWithoutDigitalBusinessCardInput>, QRCodeUncheckedUpdateWithoutDigitalBusinessCardInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type QRCodeCreateWithoutUserInput = {
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qrStatus?: boolean
    download_count?: number
    scanLogs?: ScanLogCreateNestedManyWithoutQRCodeInput
    downloadLogs?: DownloadLogCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeUncheckedCreateWithoutUserInput = {
    id?: number
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qrStatus?: boolean
    download_count?: number
    scanLogs?: ScanLogUncheckedCreateNestedManyWithoutQRCodeInput
    downloadLogs?: DownloadLogUncheckedCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeCreateOrConnectWithoutUserInput = {
    where: QRCodeWhereUniqueInput
    create: XOR<QRCodeCreateWithoutUserInput, QRCodeUncheckedCreateWithoutUserInput>
  }

  export type QRCodeCreateManyUserInputEnvelope = {
    data: QRCodeCreateManyUserInput | QRCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProfileUpdateLogCreateWithoutUserInput = {
    updated_at?: Date | string
  }

  export type ProfileUpdateLogUncheckedCreateWithoutUserInput = {
    id?: number
    updated_at?: Date | string
  }

  export type ProfileUpdateLogCreateOrConnectWithoutUserInput = {
    where: ProfileUpdateLogWhereUniqueInput
    create: XOR<ProfileUpdateLogCreateWithoutUserInput, ProfileUpdateLogUncheckedCreateWithoutUserInput>
  }

  export type ProfileUpdateLogCreateManyUserInputEnvelope = {
    data: ProfileUpdateLogCreateManyUserInput | ProfileUpdateLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionCreateWithoutUsersInput = {
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutUsersInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutUsersInput, SubscriptionUncheckedCreateWithoutUsersInput>
  }

  export type PaymentCreateWithoutUserInput = {
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription: SubscriptionCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: number
    subscriptionId: number
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AdminActionCreateWithoutUserInput = {
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
    admin: AdminUserCreateNestedOneWithoutActionsInput
  }

  export type AdminActionUncheckedCreateWithoutUserInput = {
    id?: number
    adminId: number
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AdminActionCreateOrConnectWithoutUserInput = {
    where: AdminActionWhereUniqueInput
    create: XOR<AdminActionCreateWithoutUserInput, AdminActionUncheckedCreateWithoutUserInput>
  }

  export type AdminActionCreateManyUserInputEnvelope = {
    data: AdminActionCreateManyUserInput | AdminActionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DigitalBusinessCardCreateWithoutUserInput = {
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    qrCode?: QRCodeCreateNestedOneWithoutDigitalBusinessCardInput
  }

  export type DigitalBusinessCardUncheckedCreateWithoutUserInput = {
    id?: number
    uniqueCode?: string
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalBusinessCardCreateOrConnectWithoutUserInput = {
    where: DigitalBusinessCardWhereUniqueInput
    create: XOR<DigitalBusinessCardCreateWithoutUserInput, DigitalBusinessCardUncheckedCreateWithoutUserInput>
  }

  export type DigitalBusinessCardCreateManyUserInputEnvelope = {
    data: DigitalBusinessCardCreateManyUserInput | DigitalBusinessCardCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type QRCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: QRCodeWhereUniqueInput
    update: XOR<QRCodeUpdateWithoutUserInput, QRCodeUncheckedUpdateWithoutUserInput>
    create: XOR<QRCodeCreateWithoutUserInput, QRCodeUncheckedCreateWithoutUserInput>
  }

  export type QRCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: QRCodeWhereUniqueInput
    data: XOR<QRCodeUpdateWithoutUserInput, QRCodeUncheckedUpdateWithoutUserInput>
  }

  export type QRCodeUpdateManyWithWhereWithoutUserInput = {
    where: QRCodeScalarWhereInput
    data: XOR<QRCodeUpdateManyMutationInput, QRCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type QRCodeScalarWhereInput = {
    AND?: QRCodeScalarWhereInput | QRCodeScalarWhereInput[]
    OR?: QRCodeScalarWhereInput[]
    NOT?: QRCodeScalarWhereInput | QRCodeScalarWhereInput[]
    id?: IntFilter<"QRCode"> | number
    qrData?: JsonFilter<"QRCode">
    lastLink?: StringNullableFilter<"QRCode"> | string | null
    uniqueCode?: StringFilter<"QRCode"> | string
    cornerShape?: StringFilter<"QRCode"> | string
    eyeShape?: StringFilter<"QRCode"> | string
    qrShape?: StringFilter<"QRCode"> | string
    foregroundColor?: StringFilter<"QRCode"> | string
    backgroundColor?: StringFilter<"QRCode"> | string
    dotColor?: StringNullableFilter<"QRCode"> | string | null
    cornerColor?: StringNullableFilter<"QRCode"> | string | null
    eyeColor?: StringNullableFilter<"QRCode"> | string | null
    updateCount?: IntFilter<"QRCode"> | number
    qrCodeImagePath?: StringNullableFilter<"QRCode"> | string | null
    logoPath?: StringNullableFilter<"QRCode"> | string | null
    frameStyle?: StringNullableFilter<"QRCode"> | string | null
    frameText?: StringNullableFilter<"QRCode"> | string | null
    frameTextSize?: StringNullableFilter<"QRCode"> | string | null
    frameColor?: StringNullableFilter<"QRCode"> | string | null
    frameTextColor?: StringNullableFilter<"QRCode"> | string | null
    createdAt?: DateTimeFilter<"QRCode"> | Date | string
    updatedAt?: DateTimeFilter<"QRCode"> | Date | string
    userId?: IntNullableFilter<"QRCode"> | number | null
    qrStatus?: BoolFilter<"QRCode"> | boolean
    download_count?: IntFilter<"QRCode"> | number
  }

  export type ProfileUpdateLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ProfileUpdateLogWhereUniqueInput
    update: XOR<ProfileUpdateLogUpdateWithoutUserInput, ProfileUpdateLogUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileUpdateLogCreateWithoutUserInput, ProfileUpdateLogUncheckedCreateWithoutUserInput>
  }

  export type ProfileUpdateLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ProfileUpdateLogWhereUniqueInput
    data: XOR<ProfileUpdateLogUpdateWithoutUserInput, ProfileUpdateLogUncheckedUpdateWithoutUserInput>
  }

  export type ProfileUpdateLogUpdateManyWithWhereWithoutUserInput = {
    where: ProfileUpdateLogScalarWhereInput
    data: XOR<ProfileUpdateLogUpdateManyMutationInput, ProfileUpdateLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ProfileUpdateLogScalarWhereInput = {
    AND?: ProfileUpdateLogScalarWhereInput | ProfileUpdateLogScalarWhereInput[]
    OR?: ProfileUpdateLogScalarWhereInput[]
    NOT?: ProfileUpdateLogScalarWhereInput | ProfileUpdateLogScalarWhereInput[]
    id?: IntFilter<"ProfileUpdateLog"> | number
    user_id?: IntFilter<"ProfileUpdateLog"> | number
    updated_at?: DateTimeFilter<"ProfileUpdateLog"> | Date | string
  }

  export type SubscriptionUpsertWithoutUsersInput = {
    update: XOR<SubscriptionUpdateWithoutUsersInput, SubscriptionUncheckedUpdateWithoutUsersInput>
    create: XOR<SubscriptionCreateWithoutUsersInput, SubscriptionUncheckedCreateWithoutUsersInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutUsersInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutUsersInput, SubscriptionUncheckedUpdateWithoutUsersInput>
  }

  export type SubscriptionUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    userId?: IntFilter<"Payment"> | number
    subscriptionId?: IntFilter<"Payment"> | number
    amount?: IntFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    transactionId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type AdminActionUpsertWithWhereUniqueWithoutUserInput = {
    where: AdminActionWhereUniqueInput
    update: XOR<AdminActionUpdateWithoutUserInput, AdminActionUncheckedUpdateWithoutUserInput>
    create: XOR<AdminActionCreateWithoutUserInput, AdminActionUncheckedCreateWithoutUserInput>
  }

  export type AdminActionUpdateWithWhereUniqueWithoutUserInput = {
    where: AdminActionWhereUniqueInput
    data: XOR<AdminActionUpdateWithoutUserInput, AdminActionUncheckedUpdateWithoutUserInput>
  }

  export type AdminActionUpdateManyWithWhereWithoutUserInput = {
    where: AdminActionScalarWhereInput
    data: XOR<AdminActionUpdateManyMutationInput, AdminActionUncheckedUpdateManyWithoutUserInput>
  }

  export type AdminActionScalarWhereInput = {
    AND?: AdminActionScalarWhereInput | AdminActionScalarWhereInput[]
    OR?: AdminActionScalarWhereInput[]
    NOT?: AdminActionScalarWhereInput | AdminActionScalarWhereInput[]
    id?: IntFilter<"AdminAction"> | number
    adminId?: IntFilter<"AdminAction"> | number
    userId?: IntNullableFilter<"AdminAction"> | number | null
    actionType?: StringFilter<"AdminAction"> | string
    description?: StringFilter<"AdminAction"> | string
    oldValue?: StringNullableFilter<"AdminAction"> | string | null
    newValue?: StringNullableFilter<"AdminAction"> | string | null
    createdAt?: DateTimeFilter<"AdminAction"> | Date | string
  }

  export type DigitalBusinessCardUpsertWithWhereUniqueWithoutUserInput = {
    where: DigitalBusinessCardWhereUniqueInput
    update: XOR<DigitalBusinessCardUpdateWithoutUserInput, DigitalBusinessCardUncheckedUpdateWithoutUserInput>
    create: XOR<DigitalBusinessCardCreateWithoutUserInput, DigitalBusinessCardUncheckedCreateWithoutUserInput>
  }

  export type DigitalBusinessCardUpdateWithWhereUniqueWithoutUserInput = {
    where: DigitalBusinessCardWhereUniqueInput
    data: XOR<DigitalBusinessCardUpdateWithoutUserInput, DigitalBusinessCardUncheckedUpdateWithoutUserInput>
  }

  export type DigitalBusinessCardUpdateManyWithWhereWithoutUserInput = {
    where: DigitalBusinessCardScalarWhereInput
    data: XOR<DigitalBusinessCardUpdateManyMutationInput, DigitalBusinessCardUncheckedUpdateManyWithoutUserInput>
  }

  export type DigitalBusinessCardScalarWhereInput = {
    AND?: DigitalBusinessCardScalarWhereInput | DigitalBusinessCardScalarWhereInput[]
    OR?: DigitalBusinessCardScalarWhereInput[]
    NOT?: DigitalBusinessCardScalarWhereInput | DigitalBusinessCardScalarWhereInput[]
    id?: IntFilter<"DigitalBusinessCard"> | number
    userId?: IntFilter<"DigitalBusinessCard"> | number
    uniqueCode?: StringFilter<"DigitalBusinessCard"> | string
    template?: StringFilter<"DigitalBusinessCard"> | string
    qrCodePath?: StringFilter<"DigitalBusinessCard"> | string
    name?: StringFilter<"DigitalBusinessCard"> | string
    title?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    company?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    phone?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    email?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    address?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    website?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    about?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    pronoun?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    accreditations?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    profileUrl?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    theme?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    primaryColor?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    secondaryColor?: StringNullableFilter<"DigitalBusinessCard"> | string | null
    activeFields?: JsonNullableFilter<"DigitalBusinessCard">
    fieldData?: JsonNullableFilter<"DigitalBusinessCard">
    published?: BoolFilter<"DigitalBusinessCard"> | boolean
    createdAt?: DateTimeFilter<"DigitalBusinessCard"> | Date | string
    updatedAt?: DateTimeFilter<"DigitalBusinessCard"> | Date | string
  }

  export type AdminActionCreateWithoutAdminInput = {
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutAdminActionsInput
  }

  export type AdminActionUncheckedCreateWithoutAdminInput = {
    id?: number
    userId?: number | null
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AdminActionCreateOrConnectWithoutAdminInput = {
    where: AdminActionWhereUniqueInput
    create: XOR<AdminActionCreateWithoutAdminInput, AdminActionUncheckedCreateWithoutAdminInput>
  }

  export type AdminActionCreateManyAdminInputEnvelope = {
    data: AdminActionCreateManyAdminInput | AdminActionCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type AdminActionUpsertWithWhereUniqueWithoutAdminInput = {
    where: AdminActionWhereUniqueInput
    update: XOR<AdminActionUpdateWithoutAdminInput, AdminActionUncheckedUpdateWithoutAdminInput>
    create: XOR<AdminActionCreateWithoutAdminInput, AdminActionUncheckedCreateWithoutAdminInput>
  }

  export type AdminActionUpdateWithWhereUniqueWithoutAdminInput = {
    where: AdminActionWhereUniqueInput
    data: XOR<AdminActionUpdateWithoutAdminInput, AdminActionUncheckedUpdateWithoutAdminInput>
  }

  export type AdminActionUpdateManyWithWhereWithoutAdminInput = {
    where: AdminActionScalarWhereInput
    data: XOR<AdminActionUpdateManyMutationInput, AdminActionUncheckedUpdateManyWithoutAdminInput>
  }

  export type AdminUserCreateWithoutActionsInput = {
    username: string
    email: string
    password: string
    fullName: string
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUncheckedCreateWithoutActionsInput = {
    id?: number
    username: string
    email: string
    password: string
    fullName: string
    role?: string
    isActive?: boolean
    lastLogin?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserCreateOrConnectWithoutActionsInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutActionsInput, AdminUserUncheckedCreateWithoutActionsInput>
  }

  export type UserCreateWithoutAdminActionsInput = {
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUsersInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAdminActionsInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionId?: number | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeUncheckedCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAdminActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAdminActionsInput, UserUncheckedCreateWithoutAdminActionsInput>
  }

  export type AdminUserUpsertWithoutActionsInput = {
    update: XOR<AdminUserUpdateWithoutActionsInput, AdminUserUncheckedUpdateWithoutActionsInput>
    create: XOR<AdminUserCreateWithoutActionsInput, AdminUserUncheckedCreateWithoutActionsInput>
    where?: AdminUserWhereInput
  }

  export type AdminUserUpdateToOneWithWhereWithoutActionsInput = {
    where?: AdminUserWhereInput
    data: XOR<AdminUserUpdateWithoutActionsInput, AdminUserUncheckedUpdateWithoutActionsInput>
  }

  export type AdminUserUpdateWithoutActionsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateWithoutActionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutAdminActionsInput = {
    update: XOR<UserUpdateWithoutAdminActionsInput, UserUncheckedUpdateWithoutAdminActionsInput>
    create: XOR<UserCreateWithoutAdminActionsInput, UserUncheckedCreateWithoutAdminActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAdminActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAdminActionsInput, UserUncheckedUpdateWithoutAdminActionsInput>
  }

  export type UserUpdateWithoutAdminActionsInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUsersNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAdminActionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUncheckedUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutQrCodesInput = {
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    profileUpdateLogs?: ProfileUpdateLogCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUsersInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    adminActions?: AdminActionCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutQrCodesInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionId?: number | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    profileUpdateLogs?: ProfileUpdateLogUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    adminActions?: AdminActionUncheckedCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutQrCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutQrCodesInput, UserUncheckedCreateWithoutQrCodesInput>
  }

  export type ScanLogCreateWithoutQRCodeInput = {
    scanned_at?: Date | string
    ip_address?: string | null
    country?: string | null
    region?: string | null
    city?: string | null
    isp?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    device_type?: string | null
    os_name?: string | null
    browser_name?: string | null
  }

  export type ScanLogUncheckedCreateWithoutQRCodeInput = {
    scanqr_id?: number
    scanned_at?: Date | string
    ip_address?: string | null
    country?: string | null
    region?: string | null
    city?: string | null
    isp?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    device_type?: string | null
    os_name?: string | null
    browser_name?: string | null
  }

  export type ScanLogCreateOrConnectWithoutQRCodeInput = {
    where: ScanLogWhereUniqueInput
    create: XOR<ScanLogCreateWithoutQRCodeInput, ScanLogUncheckedCreateWithoutQRCodeInput>
  }

  export type ScanLogCreateManyQRCodeInputEnvelope = {
    data: ScanLogCreateManyQRCodeInput | ScanLogCreateManyQRCodeInput[]
    skipDuplicates?: boolean
  }

  export type DownloadLogCreateWithoutQRCodeInput = {
    downloaded_at?: Date | string
  }

  export type DownloadLogUncheckedCreateWithoutQRCodeInput = {
    id?: number
    downloaded_at?: Date | string
  }

  export type DownloadLogCreateOrConnectWithoutQRCodeInput = {
    where: DownloadLogWhereUniqueInput
    create: XOR<DownloadLogCreateWithoutQRCodeInput, DownloadLogUncheckedCreateWithoutQRCodeInput>
  }

  export type DownloadLogCreateManyQRCodeInputEnvelope = {
    data: DownloadLogCreateManyQRCodeInput | DownloadLogCreateManyQRCodeInput[]
    skipDuplicates?: boolean
  }

  export type DigitalBusinessCardCreateWithoutQrCodeInput = {
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDigitalBusinessCardsInput
  }

  export type DigitalBusinessCardUncheckedCreateWithoutQrCodeInput = {
    id?: number
    userId: number
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DigitalBusinessCardCreateOrConnectWithoutQrCodeInput = {
    where: DigitalBusinessCardWhereUniqueInput
    create: XOR<DigitalBusinessCardCreateWithoutQrCodeInput, DigitalBusinessCardUncheckedCreateWithoutQrCodeInput>
  }

  export type UserUpsertWithoutQrCodesInput = {
    update: XOR<UserUpdateWithoutQrCodesInput, UserUncheckedUpdateWithoutQrCodesInput>
    create: XOR<UserCreateWithoutQrCodesInput, UserUncheckedCreateWithoutQrCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutQrCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutQrCodesInput, UserUncheckedUpdateWithoutQrCodesInput>
  }

  export type UserUpdateWithoutQrCodesInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    profileUpdateLogs?: ProfileUpdateLogUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUsersNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutQrCodesInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    profileUpdateLogs?: ProfileUpdateLogUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUncheckedUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ScanLogUpsertWithWhereUniqueWithoutQRCodeInput = {
    where: ScanLogWhereUniqueInput
    update: XOR<ScanLogUpdateWithoutQRCodeInput, ScanLogUncheckedUpdateWithoutQRCodeInput>
    create: XOR<ScanLogCreateWithoutQRCodeInput, ScanLogUncheckedCreateWithoutQRCodeInput>
  }

  export type ScanLogUpdateWithWhereUniqueWithoutQRCodeInput = {
    where: ScanLogWhereUniqueInput
    data: XOR<ScanLogUpdateWithoutQRCodeInput, ScanLogUncheckedUpdateWithoutQRCodeInput>
  }

  export type ScanLogUpdateManyWithWhereWithoutQRCodeInput = {
    where: ScanLogScalarWhereInput
    data: XOR<ScanLogUpdateManyMutationInput, ScanLogUncheckedUpdateManyWithoutQRCodeInput>
  }

  export type ScanLogScalarWhereInput = {
    AND?: ScanLogScalarWhereInput | ScanLogScalarWhereInput[]
    OR?: ScanLogScalarWhereInput[]
    NOT?: ScanLogScalarWhereInput | ScanLogScalarWhereInput[]
    scanqr_id?: IntFilter<"ScanLog"> | number
    qr_code_id?: IntFilter<"ScanLog"> | number
    scanned_at?: DateTimeFilter<"ScanLog"> | Date | string
    ip_address?: StringNullableFilter<"ScanLog"> | string | null
    country?: StringNullableFilter<"ScanLog"> | string | null
    region?: StringNullableFilter<"ScanLog"> | string | null
    city?: StringNullableFilter<"ScanLog"> | string | null
    isp?: StringNullableFilter<"ScanLog"> | string | null
    latitude?: DecimalNullableFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    longitude?: DecimalNullableFilter<"ScanLog"> | Decimal | DecimalJsLike | number | string | null
    device_type?: StringNullableFilter<"ScanLog"> | string | null
    os_name?: StringNullableFilter<"ScanLog"> | string | null
    browser_name?: StringNullableFilter<"ScanLog"> | string | null
  }

  export type DownloadLogUpsertWithWhereUniqueWithoutQRCodeInput = {
    where: DownloadLogWhereUniqueInput
    update: XOR<DownloadLogUpdateWithoutQRCodeInput, DownloadLogUncheckedUpdateWithoutQRCodeInput>
    create: XOR<DownloadLogCreateWithoutQRCodeInput, DownloadLogUncheckedCreateWithoutQRCodeInput>
  }

  export type DownloadLogUpdateWithWhereUniqueWithoutQRCodeInput = {
    where: DownloadLogWhereUniqueInput
    data: XOR<DownloadLogUpdateWithoutQRCodeInput, DownloadLogUncheckedUpdateWithoutQRCodeInput>
  }

  export type DownloadLogUpdateManyWithWhereWithoutQRCodeInput = {
    where: DownloadLogScalarWhereInput
    data: XOR<DownloadLogUpdateManyMutationInput, DownloadLogUncheckedUpdateManyWithoutQRCodeInput>
  }

  export type DownloadLogScalarWhereInput = {
    AND?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
    OR?: DownloadLogScalarWhereInput[]
    NOT?: DownloadLogScalarWhereInput | DownloadLogScalarWhereInput[]
    id?: IntFilter<"DownloadLog"> | number
    qr_code_id?: IntFilter<"DownloadLog"> | number
    downloaded_at?: DateTimeFilter<"DownloadLog"> | Date | string
  }

  export type DigitalBusinessCardUpsertWithoutQrCodeInput = {
    update: XOR<DigitalBusinessCardUpdateWithoutQrCodeInput, DigitalBusinessCardUncheckedUpdateWithoutQrCodeInput>
    create: XOR<DigitalBusinessCardCreateWithoutQrCodeInput, DigitalBusinessCardUncheckedCreateWithoutQrCodeInput>
    where?: DigitalBusinessCardWhereInput
  }

  export type DigitalBusinessCardUpdateToOneWithWhereWithoutQrCodeInput = {
    where?: DigitalBusinessCardWhereInput
    data: XOR<DigitalBusinessCardUpdateWithoutQrCodeInput, DigitalBusinessCardUncheckedUpdateWithoutQrCodeInput>
  }

  export type DigitalBusinessCardUpdateWithoutQrCodeInput = {
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDigitalBusinessCardsNestedInput
  }

  export type DigitalBusinessCardUncheckedUpdateWithoutQrCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRCodeCreateWithoutScanLogsInput = {
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qrStatus?: boolean
    download_count?: number
    user?: UserCreateNestedOneWithoutQrCodesInput
    downloadLogs?: DownloadLogCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeUncheckedCreateWithoutScanLogsInput = {
    id?: number
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    qrStatus?: boolean
    download_count?: number
    downloadLogs?: DownloadLogUncheckedCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeCreateOrConnectWithoutScanLogsInput = {
    where: QRCodeWhereUniqueInput
    create: XOR<QRCodeCreateWithoutScanLogsInput, QRCodeUncheckedCreateWithoutScanLogsInput>
  }

  export type QRCodeUpsertWithoutScanLogsInput = {
    update: XOR<QRCodeUpdateWithoutScanLogsInput, QRCodeUncheckedUpdateWithoutScanLogsInput>
    create: XOR<QRCodeCreateWithoutScanLogsInput, QRCodeUncheckedCreateWithoutScanLogsInput>
    where?: QRCodeWhereInput
  }

  export type QRCodeUpdateToOneWithWhereWithoutScanLogsInput = {
    where?: QRCodeWhereInput
    data: XOR<QRCodeUpdateWithoutScanLogsInput, QRCodeUncheckedUpdateWithoutScanLogsInput>
  }

  export type QRCodeUpdateWithoutScanLogsInput = {
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneWithoutQrCodesNestedInput
    downloadLogs?: DownloadLogUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUpdateOneWithoutQrCodeNestedInput
  }

  export type QRCodeUncheckedUpdateWithoutScanLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    downloadLogs?: DownloadLogUncheckedUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedUpdateOneWithoutQrCodeNestedInput
  }

  export type QRCodeCreateWithoutDownloadLogsInput = {
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qrStatus?: boolean
    download_count?: number
    user?: UserCreateNestedOneWithoutQrCodesInput
    scanLogs?: ScanLogCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeUncheckedCreateWithoutDownloadLogsInput = {
    id?: number
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    qrStatus?: boolean
    download_count?: number
    scanLogs?: ScanLogUncheckedCreateNestedManyWithoutQRCodeInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedCreateNestedOneWithoutQrCodeInput
  }

  export type QRCodeCreateOrConnectWithoutDownloadLogsInput = {
    where: QRCodeWhereUniqueInput
    create: XOR<QRCodeCreateWithoutDownloadLogsInput, QRCodeUncheckedCreateWithoutDownloadLogsInput>
  }

  export type QRCodeUpsertWithoutDownloadLogsInput = {
    update: XOR<QRCodeUpdateWithoutDownloadLogsInput, QRCodeUncheckedUpdateWithoutDownloadLogsInput>
    create: XOR<QRCodeCreateWithoutDownloadLogsInput, QRCodeUncheckedCreateWithoutDownloadLogsInput>
    where?: QRCodeWhereInput
  }

  export type QRCodeUpdateToOneWithWhereWithoutDownloadLogsInput = {
    where?: QRCodeWhereInput
    data: XOR<QRCodeUpdateWithoutDownloadLogsInput, QRCodeUncheckedUpdateWithoutDownloadLogsInput>
  }

  export type QRCodeUpdateWithoutDownloadLogsInput = {
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneWithoutQrCodesNestedInput
    scanLogs?: ScanLogUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUpdateOneWithoutQrCodeNestedInput
  }

  export type QRCodeUncheckedUpdateWithoutDownloadLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    scanLogs?: ScanLogUncheckedUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedUpdateOneWithoutQrCodeNestedInput
  }

  export type UserCreateWithoutProfileUpdateLogsInput = {
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUsersInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    adminActions?: AdminActionCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileUpdateLogsInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionId?: number | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    adminActions?: AdminActionUncheckedCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileUpdateLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileUpdateLogsInput, UserUncheckedCreateWithoutProfileUpdateLogsInput>
  }

  export type UserUpsertWithoutProfileUpdateLogsInput = {
    update: XOR<UserUpdateWithoutProfileUpdateLogsInput, UserUncheckedUpdateWithoutProfileUpdateLogsInput>
    create: XOR<UserCreateWithoutProfileUpdateLogsInput, UserUncheckedCreateWithoutProfileUpdateLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileUpdateLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileUpdateLogsInput, UserUncheckedUpdateWithoutProfileUpdateLogsInput>
  }

  export type UserUpdateWithoutProfileUpdateLogsInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUsersNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileUpdateLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUncheckedUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSubscriptionInput = {
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    adminActions?: AdminActionCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubscriptionInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeUncheckedCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    adminActions?: AdminActionUncheckedCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubscriptionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
  }

  export type UserCreateManySubscriptionInputEnvelope = {
    data: UserCreateManySubscriptionInput | UserCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutSubscriptionInput = {
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutSubscriptionInput = {
    id?: number
    userId: number
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput>
  }

  export type PaymentCreateManySubscriptionInputEnvelope = {
    data: PaymentCreateManySubscriptionInput | PaymentCreateManySubscriptionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
  }

  export type UserUpdateManyWithWhereWithoutSubscriptionInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    location?: StringNullableFilter<"User"> | string | null
    company?: StringNullableFilter<"User"> | string | null
    comp_position?: StringNullableFilter<"User"> | string | null
    usr_phone?: StringNullableFilter<"User"> | string | null
    twoFactorSecret?: StringNullableFilter<"User"> | string | null
    twoFactorEnabled?: BoolFilter<"User"> | boolean
    twoFactorRecoveryCodes?: StringNullableFilter<"User"> | string | null
    emailNotificationsEnabled?: BoolFilter<"User"> | boolean
    smsNotificationsEnabled?: BoolFilter<"User"> | boolean
    pushNotificationsEnabled?: BoolFilter<"User"> | boolean
    feed_rating?: IntNullableFilter<"User"> | number | null
    feed_type?: StringNullableFilter<"User"> | string | null
    feed_msg?: StringNullableFilter<"User"> | string | null
    subscriptionId?: IntNullableFilter<"User"> | number | null
    subscriptionStart?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionEnd?: DateTimeNullableFilter<"User"> | Date | string | null
    isActive?: BoolFilter<"User"> | boolean
    qrCodesUsed?: IntFilter<"User"> | number
    qrCodesLimit?: IntFilter<"User"> | number
  }

  export type PaymentUpsertWithWhereUniqueWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutSubscriptionInput, PaymentUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<PaymentCreateWithoutSubscriptionInput, PaymentUncheckedCreateWithoutSubscriptionInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutSubscriptionInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutSubscriptionInput, PaymentUncheckedUpdateWithoutSubscriptionInput>
  }

  export type PaymentUpdateManyWithWhereWithoutSubscriptionInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutSubscriptionInput>
  }

  export type UserCreateWithoutPaymentsInput = {
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUsersInput
    adminActions?: AdminActionCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionId?: number | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeUncheckedCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedCreateNestedManyWithoutUserInput
    adminActions?: AdminActionUncheckedCreateNestedManyWithoutUserInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type SubscriptionCreateWithoutPaymentsInput = {
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateWithoutPaymentsInput = {
    id?: number
    name: string
    description: string
    priceMonthly: number
    priceYearly: number
    qrCodesLimit: number
    features: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutSubscriptionInput
  }

  export type SubscriptionCreateOrConnectWithoutPaymentsInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUsersNestedInput
    adminActions?: AdminActionUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUncheckedUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUncheckedUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SubscriptionUpsertWithoutPaymentsInput = {
    update: XOR<SubscriptionUpdateWithoutPaymentsInput, SubscriptionUncheckedUpdateWithoutPaymentsInput>
    create: XOR<SubscriptionCreateWithoutPaymentsInput, SubscriptionUncheckedCreateWithoutPaymentsInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutPaymentsInput, SubscriptionUncheckedUpdateWithoutPaymentsInput>
  }

  export type SubscriptionUpdateWithoutPaymentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    priceMonthly?: IntFieldUpdateOperationsInput | number
    priceYearly?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    features?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutSubscriptionNestedInput
  }

  export type UserCreateWithoutDigitalBusinessCardsInput = {
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogCreateNestedManyWithoutUserInput
    subscription?: SubscriptionCreateNestedOneWithoutUsersInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    adminActions?: AdminActionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDigitalBusinessCardsInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionId?: number | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
    qrCodes?: QRCodeUncheckedCreateNestedManyWithoutUserInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    adminActions?: AdminActionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDigitalBusinessCardsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDigitalBusinessCardsInput, UserUncheckedCreateWithoutDigitalBusinessCardsInput>
  }

  export type QRCodeCreateWithoutDigitalBusinessCardInput = {
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qrStatus?: boolean
    download_count?: number
    user?: UserCreateNestedOneWithoutQrCodesInput
    scanLogs?: ScanLogCreateNestedManyWithoutQRCodeInput
    downloadLogs?: DownloadLogCreateNestedManyWithoutQRCodeInput
  }

  export type QRCodeUncheckedCreateWithoutDigitalBusinessCardInput = {
    id?: number
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId?: number | null
    qrStatus?: boolean
    download_count?: number
    scanLogs?: ScanLogUncheckedCreateNestedManyWithoutQRCodeInput
    downloadLogs?: DownloadLogUncheckedCreateNestedManyWithoutQRCodeInput
  }

  export type QRCodeCreateOrConnectWithoutDigitalBusinessCardInput = {
    where: QRCodeWhereUniqueInput
    create: XOR<QRCodeCreateWithoutDigitalBusinessCardInput, QRCodeUncheckedCreateWithoutDigitalBusinessCardInput>
  }

  export type UserUpsertWithoutDigitalBusinessCardsInput = {
    update: XOR<UserUpdateWithoutDigitalBusinessCardsInput, UserUncheckedUpdateWithoutDigitalBusinessCardsInput>
    create: XOR<UserCreateWithoutDigitalBusinessCardsInput, UserUncheckedCreateWithoutDigitalBusinessCardsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDigitalBusinessCardsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDigitalBusinessCardsInput, UserUncheckedUpdateWithoutDigitalBusinessCardsInput>
  }

  export type UserUpdateWithoutDigitalBusinessCardsInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUpdateManyWithoutUserNestedInput
    subscription?: SubscriptionUpdateOneWithoutUsersNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDigitalBusinessCardsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionId?: NullableIntFieldUpdateOperationsInput | number | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUncheckedUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type QRCodeUpsertWithoutDigitalBusinessCardInput = {
    update: XOR<QRCodeUpdateWithoutDigitalBusinessCardInput, QRCodeUncheckedUpdateWithoutDigitalBusinessCardInput>
    create: XOR<QRCodeCreateWithoutDigitalBusinessCardInput, QRCodeUncheckedCreateWithoutDigitalBusinessCardInput>
    where?: QRCodeWhereInput
  }

  export type QRCodeUpdateToOneWithWhereWithoutDigitalBusinessCardInput = {
    where?: QRCodeWhereInput
    data: XOR<QRCodeUpdateWithoutDigitalBusinessCardInput, QRCodeUncheckedUpdateWithoutDigitalBusinessCardInput>
  }

  export type QRCodeUpdateWithoutDigitalBusinessCardInput = {
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    user?: UserUpdateOneWithoutQrCodesNestedInput
    scanLogs?: ScanLogUpdateManyWithoutQRCodeNestedInput
    downloadLogs?: DownloadLogUpdateManyWithoutQRCodeNestedInput
  }

  export type QRCodeUncheckedUpdateWithoutDigitalBusinessCardInput = {
    id?: IntFieldUpdateOperationsInput | number
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    scanLogs?: ScanLogUncheckedUpdateManyWithoutQRCodeNestedInput
    downloadLogs?: DownloadLogUncheckedUpdateManyWithoutQRCodeNestedInput
  }

  export type QRCodeCreateManyUserInput = {
    id?: number
    qrData: JsonNullValueInput | InputJsonValue
    lastLink?: string | null
    uniqueCode?: string
    cornerShape?: string
    eyeShape?: string
    qrShape?: string
    foregroundColor?: string
    backgroundColor?: string
    dotColor?: string | null
    cornerColor?: string | null
    eyeColor?: string | null
    updateCount?: number
    qrCodeImagePath?: string | null
    logoPath?: string | null
    frameStyle?: string | null
    frameText?: string | null
    frameTextSize?: string | null
    frameColor?: string | null
    frameTextColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    qrStatus?: boolean
    download_count?: number
  }

  export type ProfileUpdateLogCreateManyUserInput = {
    id?: number
    updated_at?: Date | string
  }

  export type PaymentCreateManyUserInput = {
    id?: number
    subscriptionId: number
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminActionCreateManyUserInput = {
    id?: number
    adminId: number
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type DigitalBusinessCardCreateManyUserInput = {
    id?: number
    uniqueCode?: string
    template?: string
    qrCodePath?: string
    name: string
    title?: string | null
    company?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    about?: string | null
    pronoun?: string | null
    accreditations?: string | null
    profileUrl?: string | null
    theme?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QRCodeUpdateWithoutUserInput = {
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    scanLogs?: ScanLogUpdateManyWithoutQRCodeNestedInput
    downloadLogs?: DownloadLogUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUpdateOneWithoutQrCodeNestedInput
  }

  export type QRCodeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
    scanLogs?: ScanLogUncheckedUpdateManyWithoutQRCodeNestedInput
    downloadLogs?: DownloadLogUncheckedUpdateManyWithoutQRCodeNestedInput
    digitalBusinessCard?: DigitalBusinessCardUncheckedUpdateOneWithoutQrCodeNestedInput
  }

  export type QRCodeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    qrData?: JsonNullValueInput | InputJsonValue
    lastLink?: NullableStringFieldUpdateOperationsInput | string | null
    uniqueCode?: StringFieldUpdateOperationsInput | string
    cornerShape?: StringFieldUpdateOperationsInput | string
    eyeShape?: StringFieldUpdateOperationsInput | string
    qrShape?: StringFieldUpdateOperationsInput | string
    foregroundColor?: StringFieldUpdateOperationsInput | string
    backgroundColor?: StringFieldUpdateOperationsInput | string
    dotColor?: NullableStringFieldUpdateOperationsInput | string | null
    cornerColor?: NullableStringFieldUpdateOperationsInput | string | null
    eyeColor?: NullableStringFieldUpdateOperationsInput | string | null
    updateCount?: IntFieldUpdateOperationsInput | number
    qrCodeImagePath?: NullableStringFieldUpdateOperationsInput | string | null
    logoPath?: NullableStringFieldUpdateOperationsInput | string | null
    frameStyle?: NullableStringFieldUpdateOperationsInput | string | null
    frameText?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextSize?: NullableStringFieldUpdateOperationsInput | string | null
    frameColor?: NullableStringFieldUpdateOperationsInput | string | null
    frameTextColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrStatus?: BoolFieldUpdateOperationsInput | boolean
    download_count?: IntFieldUpdateOperationsInput | number
  }

  export type ProfileUpdateLogUpdateWithoutUserInput = {
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUpdateLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfileUpdateLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutUserInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    subscriptionId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    subscriptionId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionUpdateWithoutUserInput = {
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUserUpdateOneRequiredWithoutActionsNestedInput
  }

  export type AdminActionUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalBusinessCardUpdateWithoutUserInput = {
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrCode?: QRCodeUpdateOneRequiredWithoutDigitalBusinessCardNestedInput
  }

  export type DigitalBusinessCardUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uniqueCode?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DigitalBusinessCardUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uniqueCode?: StringFieldUpdateOperationsInput | string
    template?: StringFieldUpdateOperationsInput | string
    qrCodePath?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    pronoun?: NullableStringFieldUpdateOperationsInput | string | null
    accreditations?: NullableStringFieldUpdateOperationsInput | string | null
    profileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    theme?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    activeFields?: NullableJsonNullValueInput | InputJsonValue
    fieldData?: NullableJsonNullValueInput | InputJsonValue
    published?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionCreateManyAdminInput = {
    id?: number
    userId?: number | null
    actionType: string
    description: string
    oldValue?: string | null
    newValue?: string | null
    createdAt?: Date | string
  }

  export type AdminActionUpdateWithoutAdminInput = {
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAdminActionsNestedInput
  }

  export type AdminActionUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminActionUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: NullableIntFieldUpdateOperationsInput | number | null
    actionType?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    oldValue?: NullableStringFieldUpdateOperationsInput | string | null
    newValue?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScanLogCreateManyQRCodeInput = {
    scanqr_id?: number
    scanned_at?: Date | string
    ip_address?: string | null
    country?: string | null
    region?: string | null
    city?: string | null
    isp?: string | null
    latitude?: Decimal | DecimalJsLike | number | string | null
    longitude?: Decimal | DecimalJsLike | number | string | null
    device_type?: string | null
    os_name?: string | null
    browser_name?: string | null
  }

  export type DownloadLogCreateManyQRCodeInput = {
    id?: number
    downloaded_at?: Date | string
  }

  export type ScanLogUpdateWithoutQRCodeInput = {
    scanned_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    isp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    device_type?: NullableStringFieldUpdateOperationsInput | string | null
    os_name?: NullableStringFieldUpdateOperationsInput | string | null
    browser_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanLogUncheckedUpdateWithoutQRCodeInput = {
    scanqr_id?: IntFieldUpdateOperationsInput | number
    scanned_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    isp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    device_type?: NullableStringFieldUpdateOperationsInput | string | null
    os_name?: NullableStringFieldUpdateOperationsInput | string | null
    browser_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ScanLogUncheckedUpdateManyWithoutQRCodeInput = {
    scanqr_id?: IntFieldUpdateOperationsInput | number
    scanned_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    region?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    isp?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    longitude?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    device_type?: NullableStringFieldUpdateOperationsInput | string | null
    os_name?: NullableStringFieldUpdateOperationsInput | string | null
    browser_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DownloadLogUpdateWithoutQRCodeInput = {
    downloaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogUncheckedUpdateWithoutQRCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    downloaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DownloadLogUncheckedUpdateManyWithoutQRCodeInput = {
    id?: IntFieldUpdateOperationsInput | number
    downloaded_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManySubscriptionInput = {
    id?: number
    fullName: string
    email: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    location?: string | null
    company?: string | null
    comp_position?: string | null
    usr_phone?: string | null
    twoFactorSecret?: string | null
    twoFactorEnabled?: boolean
    twoFactorRecoveryCodes?: string | null
    emailNotificationsEnabled?: boolean
    smsNotificationsEnabled?: boolean
    pushNotificationsEnabled?: boolean
    feed_rating?: number | null
    feed_type?: string | null
    feed_msg?: string | null
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    isActive?: boolean
    qrCodesUsed?: number
    qrCodesLimit?: number
  }

  export type PaymentCreateManySubscriptionInput = {
    id?: number
    userId: number
    amount: number
    currency?: string
    status: string
    paymentMethod?: string | null
    transactionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutSubscriptionInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
    qrCodes?: QRCodeUncheckedUpdateManyWithoutUserNestedInput
    profileUpdateLogs?: ProfileUpdateLogUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    adminActions?: AdminActionUncheckedUpdateManyWithoutUserNestedInput
    digitalBusinessCards?: DigitalBusinessCardUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    comp_position?: NullableStringFieldUpdateOperationsInput | string | null
    usr_phone?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorSecret?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorEnabled?: BoolFieldUpdateOperationsInput | boolean
    twoFactorRecoveryCodes?: NullableStringFieldUpdateOperationsInput | string | null
    emailNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    smsNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    pushNotificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    feed_rating?: NullableIntFieldUpdateOperationsInput | number | null
    feed_type?: NullableStringFieldUpdateOperationsInput | string | null
    feed_msg?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    qrCodesUsed?: IntFieldUpdateOperationsInput | number
    qrCodesLimit?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentUpdateWithoutSubscriptionInput = {
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutSubscriptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutSubscriptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}