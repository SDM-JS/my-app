
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Log
 * 
 */
export type Log = $Result.DefaultSelection<Prisma.$LogPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Lessons
 * 
 */
export type Lessons = $Result.DefaultSelection<Prisma.$LessonsPayload>
/**
 * Model Groups
 * 
 */
export type Groups = $Result.DefaultSelection<Prisma.$GroupsPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Attendances
 * 
 */
export type Attendances = $Result.DefaultSelection<Prisma.$AttendancesPayload>
/**
 * Model Payments
 * 
 */
export type Payments = $Result.DefaultSelection<Prisma.$PaymentsPayload>
/**
 * Model cameFrom
 * 
 */
export type cameFrom = $Result.DefaultSelection<Prisma.$cameFromPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Roles: {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER'
};

export type Roles = (typeof Roles)[keyof typeof Roles]


export const DaysOfWeek: {
  Monday: 'Monday',
  Tuesday: 'Tuesday',
  Wednesday: 'Wednesday',
  Thursday: 'Thursday',
  Friday: 'Friday',
  Saturday: 'Saturday'
};

export type DaysOfWeek = (typeof DaysOfWeek)[keyof typeof DaysOfWeek]


export const gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type gender = (typeof gender)[keyof typeof gender]

}

export type Roles = $Enums.Roles

export const Roles: typeof $Enums.Roles

export type DaysOfWeek = $Enums.DaysOfWeek

export const DaysOfWeek: typeof $Enums.DaysOfWeek

export type gender = $Enums.gender

export const gender: typeof $Enums.gender

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.log`: Exposes CRUD operations for the **Log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Logs
    * const logs = await prisma.log.findMany()
    * ```
    */
  get log(): Prisma.LogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lessons`: Exposes CRUD operations for the **Lessons** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lessons
    * const lessons = await prisma.lessons.findMany()
    * ```
    */
  get lessons(): Prisma.LessonsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groups`: Exposes CRUD operations for the **Groups** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.groups.findMany()
    * ```
    */
  get groups(): Prisma.GroupsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.attendances`: Exposes CRUD operations for the **Attendances** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendances.findMany()
    * ```
    */
  get attendances(): Prisma.AttendancesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payments`: Exposes CRUD operations for the **Payments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payments.findMany()
    * ```
    */
  get payments(): Prisma.PaymentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cameFrom`: Exposes CRUD operations for the **cameFrom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CameFroms
    * const cameFroms = await prisma.cameFrom.findMany()
    * ```
    */
  get cameFrom(): Prisma.cameFromDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Student: 'Student',
    Log: 'Log',
    Teacher: 'Teacher',
    Lessons: 'Lessons',
    Groups: 'Groups',
    Admin: 'Admin',
    Subject: 'Subject',
    Course: 'Course',
    Attendances: 'Attendances',
    Payments: 'Payments',
    cameFrom: 'cameFrom'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "student" | "log" | "teacher" | "lessons" | "groups" | "admin" | "subject" | "course" | "attendances" | "payments" | "cameFrom"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Log: {
        payload: Prisma.$LogPayload<ExtArgs>
        fields: Prisma.LogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          findFirst: {
            args: Prisma.LogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          findMany: {
            args: Prisma.LogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>[]
          }
          create: {
            args: Prisma.LogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          createMany: {
            args: Prisma.LogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>[]
          }
          delete: {
            args: Prisma.LogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          update: {
            args: Prisma.LogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          deleteMany: {
            args: Prisma.LogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>[]
          }
          upsert: {
            args: Prisma.LogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LogPayload>
          }
          aggregate: {
            args: Prisma.LogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLog>
          }
          groupBy: {
            args: Prisma.LogGroupByArgs<ExtArgs>
            result: $Utils.Optional<LogGroupByOutputType>[]
          }
          count: {
            args: Prisma.LogCountArgs<ExtArgs>
            result: $Utils.Optional<LogCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Lessons: {
        payload: Prisma.$LessonsPayload<ExtArgs>
        fields: Prisma.LessonsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LessonsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LessonsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>
          }
          findFirst: {
            args: Prisma.LessonsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LessonsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>
          }
          findMany: {
            args: Prisma.LessonsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>[]
          }
          create: {
            args: Prisma.LessonsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>
          }
          createMany: {
            args: Prisma.LessonsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LessonsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>[]
          }
          delete: {
            args: Prisma.LessonsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>
          }
          update: {
            args: Prisma.LessonsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>
          }
          deleteMany: {
            args: Prisma.LessonsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LessonsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LessonsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>[]
          }
          upsert: {
            args: Prisma.LessonsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LessonsPayload>
          }
          aggregate: {
            args: Prisma.LessonsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLessons>
          }
          groupBy: {
            args: Prisma.LessonsGroupByArgs<ExtArgs>
            result: $Utils.Optional<LessonsGroupByOutputType>[]
          }
          count: {
            args: Prisma.LessonsCountArgs<ExtArgs>
            result: $Utils.Optional<LessonsCountAggregateOutputType> | number
          }
        }
      }
      Groups: {
        payload: Prisma.$GroupsPayload<ExtArgs>
        fields: Prisma.GroupsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>
          }
          findFirst: {
            args: Prisma.GroupsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>
          }
          findMany: {
            args: Prisma.GroupsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>[]
          }
          create: {
            args: Prisma.GroupsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>
          }
          createMany: {
            args: Prisma.GroupsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>[]
          }
          delete: {
            args: Prisma.GroupsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>
          }
          update: {
            args: Prisma.GroupsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>
          }
          deleteMany: {
            args: Prisma.GroupsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>[]
          }
          upsert: {
            args: Prisma.GroupsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupsPayload>
          }
          aggregate: {
            args: Prisma.GroupsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroups>
          }
          groupBy: {
            args: Prisma.GroupsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupsCountArgs<ExtArgs>
            result: $Utils.Optional<GroupsCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Attendances: {
        payload: Prisma.$AttendancesPayload<ExtArgs>
        fields: Prisma.AttendancesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendancesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendancesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>
          }
          findFirst: {
            args: Prisma.AttendancesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendancesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>
          }
          findMany: {
            args: Prisma.AttendancesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>[]
          }
          create: {
            args: Prisma.AttendancesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>
          }
          createMany: {
            args: Prisma.AttendancesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendancesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>[]
          }
          delete: {
            args: Prisma.AttendancesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>
          }
          update: {
            args: Prisma.AttendancesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>
          }
          deleteMany: {
            args: Prisma.AttendancesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendancesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttendancesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>[]
          }
          upsert: {
            args: Prisma.AttendancesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancesPayload>
          }
          aggregate: {
            args: Prisma.AttendancesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendances>
          }
          groupBy: {
            args: Prisma.AttendancesGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendancesGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendancesCountArgs<ExtArgs>
            result: $Utils.Optional<AttendancesCountAggregateOutputType> | number
          }
        }
      }
      Payments: {
        payload: Prisma.$PaymentsPayload<ExtArgs>
        fields: Prisma.PaymentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          findFirst: {
            args: Prisma.PaymentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          findMany: {
            args: Prisma.PaymentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>[]
          }
          create: {
            args: Prisma.PaymentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          createMany: {
            args: Prisma.PaymentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>[]
          }
          delete: {
            args: Prisma.PaymentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          update: {
            args: Prisma.PaymentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          deleteMany: {
            args: Prisma.PaymentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>[]
          }
          upsert: {
            args: Prisma.PaymentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentsPayload>
          }
          aggregate: {
            args: Prisma.PaymentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayments>
          }
          groupBy: {
            args: Prisma.PaymentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentsCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentsCountAggregateOutputType> | number
          }
        }
      }
      cameFrom: {
        payload: Prisma.$cameFromPayload<ExtArgs>
        fields: Prisma.cameFromFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cameFromFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cameFromFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>
          }
          findFirst: {
            args: Prisma.cameFromFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cameFromFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>
          }
          findMany: {
            args: Prisma.cameFromFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>[]
          }
          create: {
            args: Prisma.cameFromCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>
          }
          createMany: {
            args: Prisma.cameFromCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cameFromCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>[]
          }
          delete: {
            args: Prisma.cameFromDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>
          }
          update: {
            args: Prisma.cameFromUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>
          }
          deleteMany: {
            args: Prisma.cameFromDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cameFromUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cameFromUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>[]
          }
          upsert: {
            args: Prisma.cameFromUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cameFromPayload>
          }
          aggregate: {
            args: Prisma.CameFromAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCameFrom>
          }
          groupBy: {
            args: Prisma.cameFromGroupByArgs<ExtArgs>
            result: $Utils.Optional<CameFromGroupByOutputType>[]
          }
          count: {
            args: Prisma.cameFromCountArgs<ExtArgs>
            result: $Utils.Optional<CameFromCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    student?: StudentOmit
    log?: LogOmit
    teacher?: TeacherOmit
    lessons?: LessonsOmit
    groups?: GroupsOmit
    admin?: AdminOmit
    subject?: SubjectOmit
    course?: CourseOmit
    attendances?: AttendancesOmit
    payments?: PaymentsOmit
    cameFrom?: cameFromOmit
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
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    courses: number
    attendances: number
    payments: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | StudentCountOutputTypeCountCoursesArgs
    attendances?: boolean | StudentCountOutputTypeCountAttendancesArgs
    payments?: boolean | StudentCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendancesWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentsWhereInput
  }


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    subjects: number
    courses: number
    group: number
    attendances: number
    lessons: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subjects?: boolean | TeacherCountOutputTypeCountSubjectsArgs
    courses?: boolean | TeacherCountOutputTypeCountCoursesArgs
    group?: boolean | TeacherCountOutputTypeCountGroupArgs
    attendances?: boolean | TeacherCountOutputTypeCountAttendancesArgs
    lessons?: boolean | TeacherCountOutputTypeCountLessonsArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountSubjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountGroupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupsWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendancesWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountLessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonsWhereInput
  }


  /**
   * Count Type LessonsCountOutputType
   */

  export type LessonsCountOutputType = {
    attendance: number
  }

  export type LessonsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | LessonsCountOutputTypeCountAttendanceArgs
  }

  // Custom InputTypes
  /**
   * LessonsCountOutputType without action
   */
  export type LessonsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonsCountOutputType
     */
    select?: LessonsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LessonsCountOutputType without action
   */
  export type LessonsCountOutputTypeCountAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendancesWhereInput
  }


  /**
   * Count Type GroupsCountOutputType
   */

  export type GroupsCountOutputType = {
    students: number
    payments: number
    lessons: number
  }

  export type GroupsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | GroupsCountOutputTypeCountStudentsArgs
    payments?: boolean | GroupsCountOutputTypeCountPaymentsArgs
    lessons?: boolean | GroupsCountOutputTypeCountLessonsArgs
  }

  // Custom InputTypes
  /**
   * GroupsCountOutputType without action
   */
  export type GroupsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupsCountOutputType
     */
    select?: GroupsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupsCountOutputType without action
   */
  export type GroupsCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * GroupsCountOutputType without action
   */
  export type GroupsCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentsWhereInput
  }

  /**
   * GroupsCountOutputType without action
   */
  export type GroupsCountOutputTypeCountLessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonsWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    teachers: number
    courses: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teachers?: boolean | SubjectCountOutputTypeCountTeachersArgs
    courses?: boolean | SubjectCountOutputTypeCountCoursesArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountTeachersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountCoursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    teacher: number
    students: number
    groups: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | CourseCountOutputTypeCountTeacherArgs
    students?: boolean | CourseCountOutputTypeCountStudentsArgs
    groups?: boolean | CourseCountOutputTypeCountGroupsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountTeacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupsWhereInput
  }


  /**
   * Count Type CameFromCountOutputType
   */

  export type CameFromCountOutputType = {
    students: number
  }

  export type CameFromCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | CameFromCountOutputTypeCountStudentsArgs
  }

  // Custom InputTypes
  /**
   * CameFromCountOutputType without action
   */
  export type CameFromCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CameFromCountOutputType
     */
    select?: CameFromCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CameFromCountOutputType without action
   */
  export type CameFromCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    id: string | null
    name: string | null
    birthday: Date | null
    phone: string | null
    cameText: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
  }

  export type StudentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    birthday: Date | null
    phone: string | null
    cameText: string | null
    createdAt: Date | null
    updatedAt: Date | null
    groupId: string | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    birthday: number
    phone: number
    cameText: number
    createdAt: number
    updatedAt: number
    groupId: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    phone?: true
    cameText?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    phone?: true
    cameText?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    phone?: true
    cameText?: true
    createdAt?: true
    updatedAt?: true
    groupId?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: string
    name: string
    birthday: Date
    phone: string
    cameText: string | null
    createdAt: Date
    updatedAt: Date
    groupId: string | null
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    cameText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    groupId?: boolean
    courses?: boolean | Student$coursesArgs<ExtArgs>
    cameFrom?: boolean | Student$cameFromArgs<ExtArgs>
    group?: boolean | Student$groupArgs<ExtArgs>
    attendances?: boolean | Student$attendancesArgs<ExtArgs>
    payments?: boolean | Student$paymentsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    cameText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    groupId?: boolean
    cameFrom?: boolean | Student$cameFromArgs<ExtArgs>
    group?: boolean | Student$groupArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    cameText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    groupId?: boolean
    cameFrom?: boolean | Student$cameFromArgs<ExtArgs>
    group?: boolean | Student$groupArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    cameText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    groupId?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "birthday" | "phone" | "cameText" | "createdAt" | "updatedAt" | "groupId", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    courses?: boolean | Student$coursesArgs<ExtArgs>
    cameFrom?: boolean | Student$cameFromArgs<ExtArgs>
    group?: boolean | Student$groupArgs<ExtArgs>
    attendances?: boolean | Student$attendancesArgs<ExtArgs>
    payments?: boolean | Student$paymentsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cameFrom?: boolean | Student$cameFromArgs<ExtArgs>
    group?: boolean | Student$groupArgs<ExtArgs>
  }
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cameFrom?: boolean | Student$cameFromArgs<ExtArgs>
    group?: boolean | Student$groupArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      courses: Prisma.$CoursePayload<ExtArgs>[]
      cameFrom: Prisma.$cameFromPayload<ExtArgs> | null
      group: Prisma.$GroupsPayload<ExtArgs> | null
      attendances: Prisma.$AttendancesPayload<ExtArgs>[]
      payments: Prisma.$PaymentsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      birthday: Date
      phone: string
      cameText: string | null
      createdAt: Date
      updatedAt: Date
      groupId: string | null
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
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
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    courses<T extends Student$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Student$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cameFrom<T extends Student$cameFromArgs<ExtArgs> = {}>(args?: Subset<T, Student$cameFromArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    group<T extends Student$groupArgs<ExtArgs> = {}>(args?: Subset<T, Student$groupArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    attendances<T extends Student$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, Student$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Student$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Student$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly birthday: FieldRef<"Student", 'DateTime'>
    readonly phone: FieldRef<"Student", 'String'>
    readonly cameText: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
    readonly groupId: FieldRef<"Student", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.courses
   */
  export type Student$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Student.cameFrom
   */
  export type Student$cameFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    where?: cameFromWhereInput
  }

  /**
   * Student.group
   */
  export type Student$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    where?: GroupsWhereInput
  }

  /**
   * Student.attendances
   */
  export type Student$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    where?: AttendancesWhereInput
    orderBy?: AttendancesOrderByWithRelationInput | AttendancesOrderByWithRelationInput[]
    cursor?: AttendancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * Student.payments
   */
  export type Student$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    where?: PaymentsWhereInput
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    cursor?: PaymentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Log
   */

  export type AggregateLog = {
    _count: LogCountAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  export type LogMinAggregateOutputType = {
    id: string | null
    message: string | null
    level: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LogMaxAggregateOutputType = {
    id: string | null
    message: string | null
    level: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LogCountAggregateOutputType = {
    id: number
    message: number
    level: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LogMinAggregateInputType = {
    id?: true
    message?: true
    level?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LogMaxAggregateInputType = {
    id?: true
    message?: true
    level?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LogCountAggregateInputType = {
    id?: true
    message?: true
    level?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Log to aggregate.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Logs
    **/
    _count?: true | LogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogMaxAggregateInputType
  }

  export type GetLogAggregateType<T extends LogAggregateArgs> = {
        [P in keyof T & keyof AggregateLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLog[P]>
      : GetScalarType<T[P], AggregateLog[P]>
  }




  export type LogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LogWhereInput
    orderBy?: LogOrderByWithAggregationInput | LogOrderByWithAggregationInput[]
    by: LogScalarFieldEnum[] | LogScalarFieldEnum
    having?: LogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogCountAggregateInputType | true
    _min?: LogMinAggregateInputType
    _max?: LogMaxAggregateInputType
  }

  export type LogGroupByOutputType = {
    id: string
    message: string
    level: string
    type: string
    createdAt: Date
    updatedAt: Date
    _count: LogCountAggregateOutputType | null
    _min: LogMinAggregateOutputType | null
    _max: LogMaxAggregateOutputType | null
  }

  type GetLogGroupByPayload<T extends LogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogGroupByOutputType[P]>
            : GetScalarType<T[P], LogGroupByOutputType[P]>
        }
      >
    >


  export type LogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    level?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["log"]>

  export type LogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    level?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["log"]>

  export type LogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    message?: boolean
    level?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["log"]>

  export type LogSelectScalar = {
    id?: boolean
    message?: boolean
    level?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "message" | "level" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["log"]>

  export type $LogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Log"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      message: string
      level: string
      type: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["log"]>
    composites: {}
  }

  type LogGetPayload<S extends boolean | null | undefined | LogDefaultArgs> = $Result.GetResult<Prisma.$LogPayload, S>

  type LogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LogCountAggregateInputType | true
    }

  export interface LogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Log'], meta: { name: 'Log' } }
    /**
     * Find zero or one Log that matches the filter.
     * @param {LogFindUniqueArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LogFindUniqueArgs>(args: SelectSubset<T, LogFindUniqueArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Log that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LogFindUniqueOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LogFindUniqueOrThrowArgs>(args: SelectSubset<T, LogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LogFindFirstArgs>(args?: SelectSubset<T, LogFindFirstArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindFirstOrThrowArgs} args - Arguments to find a Log
     * @example
     * // Get one Log
     * const log = await prisma.log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LogFindFirstOrThrowArgs>(args?: SelectSubset<T, LogFindFirstOrThrowArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Logs
     * const logs = await prisma.log.findMany()
     * 
     * // Get first 10 Logs
     * const logs = await prisma.log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const logWithIdOnly = await prisma.log.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LogFindManyArgs>(args?: SelectSubset<T, LogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Log.
     * @param {LogCreateArgs} args - Arguments to create a Log.
     * @example
     * // Create one Log
     * const Log = await prisma.log.create({
     *   data: {
     *     // ... data to create a Log
     *   }
     * })
     * 
     */
    create<T extends LogCreateArgs>(args: SelectSubset<T, LogCreateArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Logs.
     * @param {LogCreateManyArgs} args - Arguments to create many Logs.
     * @example
     * // Create many Logs
     * const log = await prisma.log.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LogCreateManyArgs>(args?: SelectSubset<T, LogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Logs and returns the data saved in the database.
     * @param {LogCreateManyAndReturnArgs} args - Arguments to create many Logs.
     * @example
     * // Create many Logs
     * const log = await prisma.log.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Logs and only return the `id`
     * const logWithIdOnly = await prisma.log.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LogCreateManyAndReturnArgs>(args?: SelectSubset<T, LogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Log.
     * @param {LogDeleteArgs} args - Arguments to delete one Log.
     * @example
     * // Delete one Log
     * const Log = await prisma.log.delete({
     *   where: {
     *     // ... filter to delete one Log
     *   }
     * })
     * 
     */
    delete<T extends LogDeleteArgs>(args: SelectSubset<T, LogDeleteArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Log.
     * @param {LogUpdateArgs} args - Arguments to update one Log.
     * @example
     * // Update one Log
     * const log = await prisma.log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LogUpdateArgs>(args: SelectSubset<T, LogUpdateArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Logs.
     * @param {LogDeleteManyArgs} args - Arguments to filter Logs to delete.
     * @example
     * // Delete a few Logs
     * const { count } = await prisma.log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LogDeleteManyArgs>(args?: SelectSubset<T, LogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Logs
     * const log = await prisma.log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LogUpdateManyArgs>(args: SelectSubset<T, LogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Logs and returns the data updated in the database.
     * @param {LogUpdateManyAndReturnArgs} args - Arguments to update many Logs.
     * @example
     * // Update many Logs
     * const log = await prisma.log.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Logs and only return the `id`
     * const logWithIdOnly = await prisma.log.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LogUpdateManyAndReturnArgs>(args: SelectSubset<T, LogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Log.
     * @param {LogUpsertArgs} args - Arguments to update or create a Log.
     * @example
     * // Update or create a Log
     * const log = await prisma.log.upsert({
     *   create: {
     *     // ... data to create a Log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Log we want to update
     *   }
     * })
     */
    upsert<T extends LogUpsertArgs>(args: SelectSubset<T, LogUpsertArgs<ExtArgs>>): Prisma__LogClient<$Result.GetResult<Prisma.$LogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogCountArgs} args - Arguments to filter Logs to count.
     * @example
     * // Count the number of Logs
     * const count = await prisma.log.count({
     *   where: {
     *     // ... the filter for the Logs we want to count
     *   }
     * })
    **/
    count<T extends LogCountArgs>(
      args?: Subset<T, LogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LogAggregateArgs>(args: Subset<T, LogAggregateArgs>): Prisma.PrismaPromise<GetLogAggregateType<T>>

    /**
     * Group by Log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogGroupByArgs} args - Group by arguments.
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
      T extends LogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogGroupByArgs['orderBy'] }
        : { orderBy?: LogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Log model
   */
  readonly fields: LogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Log model
   */
  interface LogFieldRefs {
    readonly id: FieldRef<"Log", 'String'>
    readonly message: FieldRef<"Log", 'String'>
    readonly level: FieldRef<"Log", 'String'>
    readonly type: FieldRef<"Log", 'String'>
    readonly createdAt: FieldRef<"Log", 'DateTime'>
    readonly updatedAt: FieldRef<"Log", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Log findUnique
   */
  export type LogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log findUniqueOrThrow
   */
  export type LogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log findFirst
   */
  export type LogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Logs.
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Logs.
     */
    distinct?: LogScalarFieldEnum | LogScalarFieldEnum[]
  }

  /**
   * Log findFirstOrThrow
   */
  export type LogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * Filter, which Log to fetch.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Logs.
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Logs.
     */
    distinct?: LogScalarFieldEnum | LogScalarFieldEnum[]
  }

  /**
   * Log findMany
   */
  export type LogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * Filter, which Logs to fetch.
     */
    where?: LogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Logs to fetch.
     */
    orderBy?: LogOrderByWithRelationInput | LogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Logs.
     */
    cursor?: LogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Logs.
     */
    skip?: number
    distinct?: LogScalarFieldEnum | LogScalarFieldEnum[]
  }

  /**
   * Log create
   */
  export type LogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * The data needed to create a Log.
     */
    data: XOR<LogCreateInput, LogUncheckedCreateInput>
  }

  /**
   * Log createMany
   */
  export type LogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Logs.
     */
    data: LogCreateManyInput | LogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Log createManyAndReturn
   */
  export type LogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * The data used to create many Logs.
     */
    data: LogCreateManyInput | LogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Log update
   */
  export type LogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * The data needed to update a Log.
     */
    data: XOR<LogUpdateInput, LogUncheckedUpdateInput>
    /**
     * Choose, which Log to update.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log updateMany
   */
  export type LogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Logs.
     */
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyInput>
    /**
     * Filter which Logs to update
     */
    where?: LogWhereInput
    /**
     * Limit how many Logs to update.
     */
    limit?: number
  }

  /**
   * Log updateManyAndReturn
   */
  export type LogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * The data used to update Logs.
     */
    data: XOR<LogUpdateManyMutationInput, LogUncheckedUpdateManyInput>
    /**
     * Filter which Logs to update
     */
    where?: LogWhereInput
    /**
     * Limit how many Logs to update.
     */
    limit?: number
  }

  /**
   * Log upsert
   */
  export type LogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * The filter to search for the Log to update in case it exists.
     */
    where: LogWhereUniqueInput
    /**
     * In case the Log found by the `where` argument doesn't exist, create a new Log with this data.
     */
    create: XOR<LogCreateInput, LogUncheckedCreateInput>
    /**
     * In case the Log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LogUpdateInput, LogUncheckedUpdateInput>
  }

  /**
   * Log delete
   */
  export type LogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
    /**
     * Filter which Log to delete.
     */
    where: LogWhereUniqueInput
  }

  /**
   * Log deleteMany
   */
  export type LogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Logs to delete
     */
    where?: LogWhereInput
    /**
     * Limit how many Logs to delete.
     */
    limit?: number
  }

  /**
   * Log without action
   */
  export type LogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Log
     */
    select?: LogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Log
     */
    omit?: LogOmit<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    ratings: number | null
  }

  export type TeacherSumAggregateOutputType = {
    ratings: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: string | null
    name: string | null
    birthday: Date | null
    phone: string | null
    ratings: number | null
    email: string | null
    avatarUrl: string | null
    avatarFileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: string | null
    name: string | null
    birthday: Date | null
    phone: string | null
    ratings: number | null
    email: string | null
    avatarUrl: string | null
    avatarFileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    name: number
    birthday: number
    phone: number
    ratings: number
    email: number
    avatarUrl: number
    avatarFileId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    ratings?: true
  }

  export type TeacherSumAggregateInputType = {
    ratings?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    phone?: true
    ratings?: true
    email?: true
    avatarUrl?: true
    avatarFileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    phone?: true
    ratings?: true
    email?: true
    avatarUrl?: true
    avatarFileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    phone?: true
    ratings?: true
    email?: true
    avatarUrl?: true
    avatarFileId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: string
    name: string
    birthday: Date
    phone: string
    ratings: number | null
    email: string
    avatarUrl: string
    avatarFileId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    ratings?: boolean
    email?: boolean
    avatarUrl?: boolean
    avatarFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subjects?: boolean | Teacher$subjectsArgs<ExtArgs>
    courses?: boolean | Teacher$coursesArgs<ExtArgs>
    group?: boolean | Teacher$groupArgs<ExtArgs>
    attendances?: boolean | Teacher$attendancesArgs<ExtArgs>
    lessons?: boolean | Teacher$lessonsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    ratings?: boolean
    email?: boolean
    avatarUrl?: boolean
    avatarFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    ratings?: boolean
    email?: boolean
    avatarUrl?: boolean
    avatarFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    name?: boolean
    birthday?: boolean
    phone?: boolean
    ratings?: boolean
    email?: boolean
    avatarUrl?: boolean
    avatarFileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "birthday" | "phone" | "ratings" | "email" | "avatarUrl" | "avatarFileId" | "createdAt" | "updatedAt", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subjects?: boolean | Teacher$subjectsArgs<ExtArgs>
    courses?: boolean | Teacher$coursesArgs<ExtArgs>
    group?: boolean | Teacher$groupArgs<ExtArgs>
    attendances?: boolean | Teacher$attendancesArgs<ExtArgs>
    lessons?: boolean | Teacher$lessonsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      subjects: Prisma.$SubjectPayload<ExtArgs>[]
      courses: Prisma.$CoursePayload<ExtArgs>[]
      group: Prisma.$GroupsPayload<ExtArgs>[]
      attendances: Prisma.$AttendancesPayload<ExtArgs>[]
      lessons: Prisma.$LessonsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      birthday: Date
      phone: string
      ratings: number | null
      email: string
      avatarUrl: string
      avatarFileId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
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
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subjects<T extends Teacher$subjectsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$subjectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    courses<T extends Teacher$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    group<T extends Teacher$groupArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$groupArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attendances<T extends Teacher$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lessons<T extends Teacher$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'String'>
    readonly name: FieldRef<"Teacher", 'String'>
    readonly birthday: FieldRef<"Teacher", 'DateTime'>
    readonly phone: FieldRef<"Teacher", 'String'>
    readonly ratings: FieldRef<"Teacher", 'Float'>
    readonly email: FieldRef<"Teacher", 'String'>
    readonly avatarUrl: FieldRef<"Teacher", 'String'>
    readonly avatarFileId: FieldRef<"Teacher", 'String'>
    readonly createdAt: FieldRef<"Teacher", 'DateTime'>
    readonly updatedAt: FieldRef<"Teacher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.subjects
   */
  export type Teacher$subjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    cursor?: SubjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Teacher.courses
   */
  export type Teacher$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Teacher.group
   */
  export type Teacher$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    where?: GroupsWhereInput
    orderBy?: GroupsOrderByWithRelationInput | GroupsOrderByWithRelationInput[]
    cursor?: GroupsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * Teacher.attendances
   */
  export type Teacher$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    where?: AttendancesWhereInput
    orderBy?: AttendancesOrderByWithRelationInput | AttendancesOrderByWithRelationInput[]
    cursor?: AttendancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * Teacher.lessons
   */
  export type Teacher$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    where?: LessonsWhereInput
    orderBy?: LessonsOrderByWithRelationInput | LessonsOrderByWithRelationInput[]
    cursor?: LessonsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonsScalarFieldEnum | LessonsScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Lessons
   */

  export type AggregateLessons = {
    _count: LessonsCountAggregateOutputType | null
    _min: LessonsMinAggregateOutputType | null
    _max: LessonsMaxAggregateOutputType | null
  }

  export type LessonsMinAggregateOutputType = {
    id: string | null
    desc: string | null
    groupId: string | null
    teacherId: string | null
    startTime: Date | null
    endTime: Date | null
    room: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LessonsMaxAggregateOutputType = {
    id: string | null
    desc: string | null
    groupId: string | null
    teacherId: string | null
    startTime: Date | null
    endTime: Date | null
    room: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LessonsCountAggregateOutputType = {
    id: number
    desc: number
    daysOfWeek: number
    groupId: number
    teacherId: number
    startTime: number
    endTime: number
    room: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LessonsMinAggregateInputType = {
    id?: true
    desc?: true
    groupId?: true
    teacherId?: true
    startTime?: true
    endTime?: true
    room?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LessonsMaxAggregateInputType = {
    id?: true
    desc?: true
    groupId?: true
    teacherId?: true
    startTime?: true
    endTime?: true
    room?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LessonsCountAggregateInputType = {
    id?: true
    desc?: true
    daysOfWeek?: true
    groupId?: true
    teacherId?: true
    startTime?: true
    endTime?: true
    room?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LessonsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lessons to aggregate.
     */
    where?: LessonsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonsOrderByWithRelationInput | LessonsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LessonsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lessons
    **/
    _count?: true | LessonsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LessonsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LessonsMaxAggregateInputType
  }

  export type GetLessonsAggregateType<T extends LessonsAggregateArgs> = {
        [P in keyof T & keyof AggregateLessons]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLessons[P]>
      : GetScalarType<T[P], AggregateLessons[P]>
  }




  export type LessonsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LessonsWhereInput
    orderBy?: LessonsOrderByWithAggregationInput | LessonsOrderByWithAggregationInput[]
    by: LessonsScalarFieldEnum[] | LessonsScalarFieldEnum
    having?: LessonsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LessonsCountAggregateInputType | true
    _min?: LessonsMinAggregateInputType
    _max?: LessonsMaxAggregateInputType
  }

  export type LessonsGroupByOutputType = {
    id: string
    desc: string
    daysOfWeek: $Enums.DaysOfWeek[]
    groupId: string | null
    teacherId: string | null
    startTime: Date
    endTime: Date
    room: string
    createdAt: Date
    updatedAt: Date
    _count: LessonsCountAggregateOutputType | null
    _min: LessonsMinAggregateOutputType | null
    _max: LessonsMaxAggregateOutputType | null
  }

  type GetLessonsGroupByPayload<T extends LessonsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LessonsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LessonsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LessonsGroupByOutputType[P]>
            : GetScalarType<T[P], LessonsGroupByOutputType[P]>
        }
      >
    >


  export type LessonsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    desc?: boolean
    daysOfWeek?: boolean
    groupId?: boolean
    teacherId?: boolean
    startTime?: boolean
    endTime?: boolean
    room?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | Lessons$groupArgs<ExtArgs>
    teacher?: boolean | Lessons$teacherArgs<ExtArgs>
    attendance?: boolean | Lessons$attendanceArgs<ExtArgs>
    _count?: boolean | LessonsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lessons"]>

  export type LessonsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    desc?: boolean
    daysOfWeek?: boolean
    groupId?: boolean
    teacherId?: boolean
    startTime?: boolean
    endTime?: boolean
    room?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | Lessons$groupArgs<ExtArgs>
    teacher?: boolean | Lessons$teacherArgs<ExtArgs>
  }, ExtArgs["result"]["lessons"]>

  export type LessonsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    desc?: boolean
    daysOfWeek?: boolean
    groupId?: boolean
    teacherId?: boolean
    startTime?: boolean
    endTime?: boolean
    room?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | Lessons$groupArgs<ExtArgs>
    teacher?: boolean | Lessons$teacherArgs<ExtArgs>
  }, ExtArgs["result"]["lessons"]>

  export type LessonsSelectScalar = {
    id?: boolean
    desc?: boolean
    daysOfWeek?: boolean
    groupId?: boolean
    teacherId?: boolean
    startTime?: boolean
    endTime?: boolean
    room?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LessonsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "desc" | "daysOfWeek" | "groupId" | "teacherId" | "startTime" | "endTime" | "room" | "createdAt" | "updatedAt", ExtArgs["result"]["lessons"]>
  export type LessonsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Lessons$groupArgs<ExtArgs>
    teacher?: boolean | Lessons$teacherArgs<ExtArgs>
    attendance?: boolean | Lessons$attendanceArgs<ExtArgs>
    _count?: boolean | LessonsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LessonsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Lessons$groupArgs<ExtArgs>
    teacher?: boolean | Lessons$teacherArgs<ExtArgs>
  }
  export type LessonsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Lessons$groupArgs<ExtArgs>
    teacher?: boolean | Lessons$teacherArgs<ExtArgs>
  }

  export type $LessonsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lessons"
    objects: {
      group: Prisma.$GroupsPayload<ExtArgs> | null
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
      attendance: Prisma.$AttendancesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      desc: string
      daysOfWeek: $Enums.DaysOfWeek[]
      groupId: string | null
      teacherId: string | null
      startTime: Date
      endTime: Date
      room: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["lessons"]>
    composites: {}
  }

  type LessonsGetPayload<S extends boolean | null | undefined | LessonsDefaultArgs> = $Result.GetResult<Prisma.$LessonsPayload, S>

  type LessonsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LessonsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LessonsCountAggregateInputType | true
    }

  export interface LessonsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lessons'], meta: { name: 'Lessons' } }
    /**
     * Find zero or one Lessons that matches the filter.
     * @param {LessonsFindUniqueArgs} args - Arguments to find a Lessons
     * @example
     * // Get one Lessons
     * const lessons = await prisma.lessons.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LessonsFindUniqueArgs>(args: SelectSubset<T, LessonsFindUniqueArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lessons that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LessonsFindUniqueOrThrowArgs} args - Arguments to find a Lessons
     * @example
     * // Get one Lessons
     * const lessons = await prisma.lessons.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LessonsFindUniqueOrThrowArgs>(args: SelectSubset<T, LessonsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonsFindFirstArgs} args - Arguments to find a Lessons
     * @example
     * // Get one Lessons
     * const lessons = await prisma.lessons.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LessonsFindFirstArgs>(args?: SelectSubset<T, LessonsFindFirstArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lessons that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonsFindFirstOrThrowArgs} args - Arguments to find a Lessons
     * @example
     * // Get one Lessons
     * const lessons = await prisma.lessons.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LessonsFindFirstOrThrowArgs>(args?: SelectSubset<T, LessonsFindFirstOrThrowArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lessons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lessons
     * const lessons = await prisma.lessons.findMany()
     * 
     * // Get first 10 Lessons
     * const lessons = await prisma.lessons.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lessonsWithIdOnly = await prisma.lessons.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LessonsFindManyArgs>(args?: SelectSubset<T, LessonsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lessons.
     * @param {LessonsCreateArgs} args - Arguments to create a Lessons.
     * @example
     * // Create one Lessons
     * const Lessons = await prisma.lessons.create({
     *   data: {
     *     // ... data to create a Lessons
     *   }
     * })
     * 
     */
    create<T extends LessonsCreateArgs>(args: SelectSubset<T, LessonsCreateArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lessons.
     * @param {LessonsCreateManyArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lessons = await prisma.lessons.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LessonsCreateManyArgs>(args?: SelectSubset<T, LessonsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lessons and returns the data saved in the database.
     * @param {LessonsCreateManyAndReturnArgs} args - Arguments to create many Lessons.
     * @example
     * // Create many Lessons
     * const lessons = await prisma.lessons.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lessons and only return the `id`
     * const lessonsWithIdOnly = await prisma.lessons.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LessonsCreateManyAndReturnArgs>(args?: SelectSubset<T, LessonsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lessons.
     * @param {LessonsDeleteArgs} args - Arguments to delete one Lessons.
     * @example
     * // Delete one Lessons
     * const Lessons = await prisma.lessons.delete({
     *   where: {
     *     // ... filter to delete one Lessons
     *   }
     * })
     * 
     */
    delete<T extends LessonsDeleteArgs>(args: SelectSubset<T, LessonsDeleteArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lessons.
     * @param {LessonsUpdateArgs} args - Arguments to update one Lessons.
     * @example
     * // Update one Lessons
     * const lessons = await prisma.lessons.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LessonsUpdateArgs>(args: SelectSubset<T, LessonsUpdateArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lessons.
     * @param {LessonsDeleteManyArgs} args - Arguments to filter Lessons to delete.
     * @example
     * // Delete a few Lessons
     * const { count } = await prisma.lessons.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LessonsDeleteManyArgs>(args?: SelectSubset<T, LessonsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lessons
     * const lessons = await prisma.lessons.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LessonsUpdateManyArgs>(args: SelectSubset<T, LessonsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lessons and returns the data updated in the database.
     * @param {LessonsUpdateManyAndReturnArgs} args - Arguments to update many Lessons.
     * @example
     * // Update many Lessons
     * const lessons = await prisma.lessons.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lessons and only return the `id`
     * const lessonsWithIdOnly = await prisma.lessons.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LessonsUpdateManyAndReturnArgs>(args: SelectSubset<T, LessonsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lessons.
     * @param {LessonsUpsertArgs} args - Arguments to update or create a Lessons.
     * @example
     * // Update or create a Lessons
     * const lessons = await prisma.lessons.upsert({
     *   create: {
     *     // ... data to create a Lessons
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lessons we want to update
     *   }
     * })
     */
    upsert<T extends LessonsUpsertArgs>(args: SelectSubset<T, LessonsUpsertArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonsCountArgs} args - Arguments to filter Lessons to count.
     * @example
     * // Count the number of Lessons
     * const count = await prisma.lessons.count({
     *   where: {
     *     // ... the filter for the Lessons we want to count
     *   }
     * })
    **/
    count<T extends LessonsCountArgs>(
      args?: Subset<T, LessonsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LessonsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LessonsAggregateArgs>(args: Subset<T, LessonsAggregateArgs>): Prisma.PrismaPromise<GetLessonsAggregateType<T>>

    /**
     * Group by Lessons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LessonsGroupByArgs} args - Group by arguments.
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
      T extends LessonsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LessonsGroupByArgs['orderBy'] }
        : { orderBy?: LessonsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LessonsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lessons model
   */
  readonly fields: LessonsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lessons.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LessonsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends Lessons$groupArgs<ExtArgs> = {}>(args?: Subset<T, Lessons$groupArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    teacher<T extends Lessons$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Lessons$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    attendance<T extends Lessons$attendanceArgs<ExtArgs> = {}>(args?: Subset<T, Lessons$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Lessons model
   */
  interface LessonsFieldRefs {
    readonly id: FieldRef<"Lessons", 'String'>
    readonly desc: FieldRef<"Lessons", 'String'>
    readonly daysOfWeek: FieldRef<"Lessons", 'DaysOfWeek[]'>
    readonly groupId: FieldRef<"Lessons", 'String'>
    readonly teacherId: FieldRef<"Lessons", 'String'>
    readonly startTime: FieldRef<"Lessons", 'DateTime'>
    readonly endTime: FieldRef<"Lessons", 'DateTime'>
    readonly room: FieldRef<"Lessons", 'String'>
    readonly createdAt: FieldRef<"Lessons", 'DateTime'>
    readonly updatedAt: FieldRef<"Lessons", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lessons findUnique
   */
  export type LessonsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where: LessonsWhereUniqueInput
  }

  /**
   * Lessons findUniqueOrThrow
   */
  export type LessonsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where: LessonsWhereUniqueInput
  }

  /**
   * Lessons findFirst
   */
  export type LessonsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonsOrderByWithRelationInput | LessonsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonsScalarFieldEnum | LessonsScalarFieldEnum[]
  }

  /**
   * Lessons findFirstOrThrow
   */
  export type LessonsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonsOrderByWithRelationInput | LessonsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lessons.
     */
    cursor?: LessonsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lessons.
     */
    distinct?: LessonsScalarFieldEnum | LessonsScalarFieldEnum[]
  }

  /**
   * Lessons findMany
   */
  export type LessonsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * Filter, which Lessons to fetch.
     */
    where?: LessonsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lessons to fetch.
     */
    orderBy?: LessonsOrderByWithRelationInput | LessonsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lessons.
     */
    cursor?: LessonsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lessons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lessons.
     */
    skip?: number
    distinct?: LessonsScalarFieldEnum | LessonsScalarFieldEnum[]
  }

  /**
   * Lessons create
   */
  export type LessonsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * The data needed to create a Lessons.
     */
    data: XOR<LessonsCreateInput, LessonsUncheckedCreateInput>
  }

  /**
   * Lessons createMany
   */
  export type LessonsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lessons.
     */
    data: LessonsCreateManyInput | LessonsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lessons createManyAndReturn
   */
  export type LessonsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * The data used to create many Lessons.
     */
    data: LessonsCreateManyInput | LessonsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lessons update
   */
  export type LessonsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * The data needed to update a Lessons.
     */
    data: XOR<LessonsUpdateInput, LessonsUncheckedUpdateInput>
    /**
     * Choose, which Lessons to update.
     */
    where: LessonsWhereUniqueInput
  }

  /**
   * Lessons updateMany
   */
  export type LessonsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonsUpdateManyMutationInput, LessonsUncheckedUpdateManyInput>
    /**
     * Filter which Lessons to update
     */
    where?: LessonsWhereInput
    /**
     * Limit how many Lessons to update.
     */
    limit?: number
  }

  /**
   * Lessons updateManyAndReturn
   */
  export type LessonsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * The data used to update Lessons.
     */
    data: XOR<LessonsUpdateManyMutationInput, LessonsUncheckedUpdateManyInput>
    /**
     * Filter which Lessons to update
     */
    where?: LessonsWhereInput
    /**
     * Limit how many Lessons to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lessons upsert
   */
  export type LessonsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * The filter to search for the Lessons to update in case it exists.
     */
    where: LessonsWhereUniqueInput
    /**
     * In case the Lessons found by the `where` argument doesn't exist, create a new Lessons with this data.
     */
    create: XOR<LessonsCreateInput, LessonsUncheckedCreateInput>
    /**
     * In case the Lessons was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LessonsUpdateInput, LessonsUncheckedUpdateInput>
  }

  /**
   * Lessons delete
   */
  export type LessonsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    /**
     * Filter which Lessons to delete.
     */
    where: LessonsWhereUniqueInput
  }

  /**
   * Lessons deleteMany
   */
  export type LessonsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lessons to delete
     */
    where?: LessonsWhereInput
    /**
     * Limit how many Lessons to delete.
     */
    limit?: number
  }

  /**
   * Lessons.group
   */
  export type Lessons$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    where?: GroupsWhereInput
  }

  /**
   * Lessons.teacher
   */
  export type Lessons$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * Lessons.attendance
   */
  export type Lessons$attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    where?: AttendancesWhereInput
    orderBy?: AttendancesOrderByWithRelationInput | AttendancesOrderByWithRelationInput[]
    cursor?: AttendancesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * Lessons without action
   */
  export type LessonsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
  }


  /**
   * Model Groups
   */

  export type AggregateGroups = {
    _count: GroupsCountAggregateOutputType | null
    _min: GroupsMinAggregateOutputType | null
    _max: GroupsMaxAggregateOutputType | null
  }

  export type GroupsMinAggregateOutputType = {
    id: string | null
    name: string | null
    courseId: string | null
    teacherId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    courseId: string | null
    teacherId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupsCountAggregateOutputType = {
    id: number
    name: number
    courseId: number
    teacherId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupsMinAggregateInputType = {
    id?: true
    name?: true
    courseId?: true
    teacherId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupsMaxAggregateInputType = {
    id?: true
    name?: true
    courseId?: true
    teacherId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupsCountAggregateInputType = {
    id?: true
    name?: true
    courseId?: true
    teacherId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to aggregate.
     */
    where?: GroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupsOrderByWithRelationInput | GroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupsMaxAggregateInputType
  }

  export type GetGroupsAggregateType<T extends GroupsAggregateArgs> = {
        [P in keyof T & keyof AggregateGroups]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroups[P]>
      : GetScalarType<T[P], AggregateGroups[P]>
  }




  export type GroupsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupsWhereInput
    orderBy?: GroupsOrderByWithAggregationInput | GroupsOrderByWithAggregationInput[]
    by: GroupsScalarFieldEnum[] | GroupsScalarFieldEnum
    having?: GroupsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupsCountAggregateInputType | true
    _min?: GroupsMinAggregateInputType
    _max?: GroupsMaxAggregateInputType
  }

  export type GroupsGroupByOutputType = {
    id: string
    name: string
    courseId: string | null
    teacherId: string | null
    createdAt: Date
    updatedAt: Date
    _count: GroupsCountAggregateOutputType | null
    _min: GroupsMinAggregateOutputType | null
    _max: GroupsMaxAggregateOutputType | null
  }

  type GetGroupsGroupByPayload<T extends GroupsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupsGroupByOutputType[P]>
            : GetScalarType<T[P], GroupsGroupByOutputType[P]>
        }
      >
    >


  export type GroupsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    courseId?: boolean
    teacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    students?: boolean | Groups$studentsArgs<ExtArgs>
    teacher?: boolean | Groups$teacherArgs<ExtArgs>
    course?: boolean | Groups$courseArgs<ExtArgs>
    payments?: boolean | Groups$paymentsArgs<ExtArgs>
    lessons?: boolean | Groups$lessonsArgs<ExtArgs>
    _count?: boolean | GroupsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groups"]>

  export type GroupsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    courseId?: boolean
    teacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | Groups$teacherArgs<ExtArgs>
    course?: boolean | Groups$courseArgs<ExtArgs>
  }, ExtArgs["result"]["groups"]>

  export type GroupsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    courseId?: boolean
    teacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teacher?: boolean | Groups$teacherArgs<ExtArgs>
    course?: boolean | Groups$courseArgs<ExtArgs>
  }, ExtArgs["result"]["groups"]>

  export type GroupsSelectScalar = {
    id?: boolean
    name?: boolean
    courseId?: boolean
    teacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "courseId" | "teacherId" | "createdAt" | "updatedAt", ExtArgs["result"]["groups"]>
  export type GroupsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | Groups$studentsArgs<ExtArgs>
    teacher?: boolean | Groups$teacherArgs<ExtArgs>
    course?: boolean | Groups$courseArgs<ExtArgs>
    payments?: boolean | Groups$paymentsArgs<ExtArgs>
    lessons?: boolean | Groups$lessonsArgs<ExtArgs>
    _count?: boolean | GroupsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Groups$teacherArgs<ExtArgs>
    course?: boolean | Groups$courseArgs<ExtArgs>
  }
  export type GroupsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | Groups$teacherArgs<ExtArgs>
    course?: boolean | Groups$courseArgs<ExtArgs>
  }

  export type $GroupsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Groups"
    objects: {
      students: Prisma.$StudentPayload<ExtArgs>[]
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
      course: Prisma.$CoursePayload<ExtArgs> | null
      payments: Prisma.$PaymentsPayload<ExtArgs>[]
      lessons: Prisma.$LessonsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      courseId: string | null
      teacherId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["groups"]>
    composites: {}
  }

  type GroupsGetPayload<S extends boolean | null | undefined | GroupsDefaultArgs> = $Result.GetResult<Prisma.$GroupsPayload, S>

  type GroupsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupsCountAggregateInputType | true
    }

  export interface GroupsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Groups'], meta: { name: 'Groups' } }
    /**
     * Find zero or one Groups that matches the filter.
     * @param {GroupsFindUniqueArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupsFindUniqueArgs>(args: SelectSubset<T, GroupsFindUniqueArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Groups that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupsFindUniqueOrThrowArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupsFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsFindFirstArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupsFindFirstArgs>(args?: SelectSubset<T, GroupsFindFirstArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Groups that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsFindFirstOrThrowArgs} args - Arguments to find a Groups
     * @example
     * // Get one Groups
     * const groups = await prisma.groups.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupsFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.groups.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.groups.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupsWithIdOnly = await prisma.groups.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupsFindManyArgs>(args?: SelectSubset<T, GroupsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Groups.
     * @param {GroupsCreateArgs} args - Arguments to create a Groups.
     * @example
     * // Create one Groups
     * const Groups = await prisma.groups.create({
     *   data: {
     *     // ... data to create a Groups
     *   }
     * })
     * 
     */
    create<T extends GroupsCreateArgs>(args: SelectSubset<T, GroupsCreateArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupsCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const groups = await prisma.groups.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupsCreateManyArgs>(args?: SelectSubset<T, GroupsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupsCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const groups = await prisma.groups.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `id`
     * const groupsWithIdOnly = await prisma.groups.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupsCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Groups.
     * @param {GroupsDeleteArgs} args - Arguments to delete one Groups.
     * @example
     * // Delete one Groups
     * const Groups = await prisma.groups.delete({
     *   where: {
     *     // ... filter to delete one Groups
     *   }
     * })
     * 
     */
    delete<T extends GroupsDeleteArgs>(args: SelectSubset<T, GroupsDeleteArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Groups.
     * @param {GroupsUpdateArgs} args - Arguments to update one Groups.
     * @example
     * // Update one Groups
     * const groups = await prisma.groups.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupsUpdateArgs>(args: SelectSubset<T, GroupsUpdateArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupsDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.groups.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupsDeleteManyArgs>(args?: SelectSubset<T, GroupsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const groups = await prisma.groups.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupsUpdateManyArgs>(args: SelectSubset<T, GroupsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupsUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const groups = await prisma.groups.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `id`
     * const groupsWithIdOnly = await prisma.groups.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupsUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Groups.
     * @param {GroupsUpsertArgs} args - Arguments to update or create a Groups.
     * @example
     * // Update or create a Groups
     * const groups = await prisma.groups.upsert({
     *   create: {
     *     // ... data to create a Groups
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Groups we want to update
     *   }
     * })
     */
    upsert<T extends GroupsUpsertArgs>(args: SelectSubset<T, GroupsUpsertArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.groups.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupsCountArgs>(
      args?: Subset<T, GroupsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupsAggregateArgs>(args: Subset<T, GroupsAggregateArgs>): Prisma.PrismaPromise<GetGroupsAggregateType<T>>

    /**
     * Group by Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupsGroupByArgs} args - Group by arguments.
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
      T extends GroupsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupsGroupByArgs['orderBy'] }
        : { orderBy?: GroupsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Groups model
   */
  readonly fields: GroupsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Groups.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    students<T extends Groups$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Groups$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teacher<T extends Groups$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Groups$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    course<T extends Groups$courseArgs<ExtArgs> = {}>(args?: Subset<T, Groups$courseArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payments<T extends Groups$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Groups$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    lessons<T extends Groups$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Groups$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Groups model
   */
  interface GroupsFieldRefs {
    readonly id: FieldRef<"Groups", 'String'>
    readonly name: FieldRef<"Groups", 'String'>
    readonly courseId: FieldRef<"Groups", 'String'>
    readonly teacherId: FieldRef<"Groups", 'String'>
    readonly createdAt: FieldRef<"Groups", 'DateTime'>
    readonly updatedAt: FieldRef<"Groups", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Groups findUnique
   */
  export type GroupsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where: GroupsWhereUniqueInput
  }

  /**
   * Groups findUniqueOrThrow
   */
  export type GroupsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where: GroupsWhereUniqueInput
  }

  /**
   * Groups findFirst
   */
  export type GroupsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupsOrderByWithRelationInput | GroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * Groups findFirstOrThrow
   */
  export type GroupsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupsOrderByWithRelationInput | GroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * Groups findMany
   */
  export type GroupsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupsOrderByWithRelationInput | GroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * Groups create
   */
  export type GroupsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * The data needed to create a Groups.
     */
    data: XOR<GroupsCreateInput, GroupsUncheckedCreateInput>
  }

  /**
   * Groups createMany
   */
  export type GroupsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupsCreateManyInput | GroupsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Groups createManyAndReturn
   */
  export type GroupsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupsCreateManyInput | GroupsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Groups update
   */
  export type GroupsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * The data needed to update a Groups.
     */
    data: XOR<GroupsUpdateInput, GroupsUncheckedUpdateInput>
    /**
     * Choose, which Groups to update.
     */
    where: GroupsWhereUniqueInput
  }

  /**
   * Groups updateMany
   */
  export type GroupsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupsUpdateManyMutationInput, GroupsUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupsWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Groups updateManyAndReturn
   */
  export type GroupsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupsUpdateManyMutationInput, GroupsUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupsWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Groups upsert
   */
  export type GroupsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * The filter to search for the Groups to update in case it exists.
     */
    where: GroupsWhereUniqueInput
    /**
     * In case the Groups found by the `where` argument doesn't exist, create a new Groups with this data.
     */
    create: XOR<GroupsCreateInput, GroupsUncheckedCreateInput>
    /**
     * In case the Groups was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupsUpdateInput, GroupsUncheckedUpdateInput>
  }

  /**
   * Groups delete
   */
  export type GroupsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    /**
     * Filter which Groups to delete.
     */
    where: GroupsWhereUniqueInput
  }

  /**
   * Groups deleteMany
   */
  export type GroupsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupsWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Groups.students
   */
  export type Groups$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Groups.teacher
   */
  export type Groups$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * Groups.course
   */
  export type Groups$courseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
  }

  /**
   * Groups.payments
   */
  export type Groups$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    where?: PaymentsWhereInput
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    cursor?: PaymentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Groups.lessons
   */
  export type Groups$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    where?: LessonsWhereInput
    orderBy?: LessonsOrderByWithRelationInput | LessonsOrderByWithRelationInput[]
    cursor?: LessonsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LessonsScalarFieldEnum | LessonsScalarFieldEnum[]
  }

  /**
   * Groups without action
   */
  export type GroupsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    name: string | null
    birthday: Date | null
    email: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    name: string | null
    birthday: Date | null
    email: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    name: number
    birthday: number
    email: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    email?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    email?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    name?: true
    birthday?: true
    email?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    name: string
    birthday: Date
    email: string
    avatarUrl: string
    createdAt: Date
    updatedAt: Date
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    email?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    email?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthday?: boolean
    email?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    name?: boolean
    birthday?: boolean
    email?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "birthday" | "email" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      birthday: Date
      email: string
      avatarUrl: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly birthday: FieldRef<"Admin", 'DateTime'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly avatarUrl: FieldRef<"Admin", 'String'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubjectMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: SubjectCountAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    teachers?: boolean | Subject$teachersArgs<ExtArgs>
    courses?: boolean | Subject$coursesArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["subject"]>
  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teachers?: boolean | Subject$teachersArgs<ExtArgs>
    courses?: boolean | Subject$coursesArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      teachers: Prisma.$TeacherPayload<ExtArgs>[]
      courses: Prisma.$CoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
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
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teachers<T extends Subject$teachersArgs<ExtArgs> = {}>(args?: Subset<T, Subject$teachersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    courses<T extends Subject$coursesArgs<ExtArgs> = {}>(args?: Subset<T, Subject$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'String'>
    readonly name: FieldRef<"Subject", 'String'>
    readonly createdAt: FieldRef<"Subject", 'DateTime'>
    readonly updatedAt: FieldRef<"Subject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject.teachers
   */
  export type Subject$teachersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    cursor?: TeacherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Subject.courses
   */
  export type Subject$coursesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    cursor?: CourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    desc: string | null
    price: string | null
    subjectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    desc: string | null
    price: string | null
    subjectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    name: number
    desc: number
    price: number
    subjectId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CourseMinAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    price?: true
    subjectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    price?: true
    subjectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    name?: true
    desc?: true
    price?: true
    subjectId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: string
    name: string
    desc: string
    price: string
    subjectId: string | null
    createdAt: Date
    updatedAt: Date
    _count: CourseCountAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    desc?: boolean
    price?: boolean
    subjectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subject?: boolean | Course$subjectArgs<ExtArgs>
    teacher?: boolean | Course$teacherArgs<ExtArgs>
    students?: boolean | Course$studentsArgs<ExtArgs>
    groups?: boolean | Course$groupsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    desc?: boolean
    price?: boolean
    subjectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subject?: boolean | Course$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    desc?: boolean
    price?: boolean
    subjectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subject?: boolean | Course$subjectArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    name?: boolean
    desc?: boolean
    price?: boolean
    subjectId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "desc" | "price" | "subjectId" | "createdAt" | "updatedAt", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | Course$subjectArgs<ExtArgs>
    teacher?: boolean | Course$teacherArgs<ExtArgs>
    students?: boolean | Course$studentsArgs<ExtArgs>
    groups?: boolean | Course$groupsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | Course$subjectArgs<ExtArgs>
  }
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subject?: boolean | Course$subjectArgs<ExtArgs>
  }

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      subject: Prisma.$SubjectPayload<ExtArgs> | null
      teacher: Prisma.$TeacherPayload<ExtArgs>[]
      students: Prisma.$StudentPayload<ExtArgs>[]
      groups: Prisma.$GroupsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      desc: string
      price: string
      subjectId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
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
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subject<T extends Course$subjectArgs<ExtArgs> = {}>(args?: Subset<T, Course$subjectArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    teacher<T extends Course$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Course$teacherArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    students<T extends Course$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groups<T extends Course$groupsArgs<ExtArgs> = {}>(args?: Subset<T, Course$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'String'>
    readonly name: FieldRef<"Course", 'String'>
    readonly desc: FieldRef<"Course", 'String'>
    readonly price: FieldRef<"Course", 'String'>
    readonly subjectId: FieldRef<"Course", 'String'>
    readonly createdAt: FieldRef<"Course", 'DateTime'>
    readonly updatedAt: FieldRef<"Course", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.subject
   */
  export type Course$subjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    where?: SubjectWhereInput
  }

  /**
   * Course.teacher
   */
  export type Course$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    cursor?: TeacherWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Course.students
   */
  export type Course$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Course.groups
   */
  export type Course$groupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    where?: GroupsWhereInput
    orderBy?: GroupsOrderByWithRelationInput | GroupsOrderByWithRelationInput[]
    cursor?: GroupsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupsScalarFieldEnum | GroupsScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Attendances
   */

  export type AggregateAttendances = {
    _count: AttendancesCountAggregateOutputType | null
    _min: AttendancesMinAggregateOutputType | null
    _max: AttendancesMaxAggregateOutputType | null
  }

  export type AttendancesMinAggregateOutputType = {
    id: string | null
    desc: string | null
    studentId: string | null
    teacherId: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lessonsId: string | null
  }

  export type AttendancesMaxAggregateOutputType = {
    id: string | null
    desc: string | null
    studentId: string | null
    teacherId: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    lessonsId: string | null
  }

  export type AttendancesCountAggregateOutputType = {
    id: number
    desc: number
    studentId: number
    teacherId: number
    date: number
    createdAt: number
    updatedAt: number
    lessonsId: number
    _all: number
  }


  export type AttendancesMinAggregateInputType = {
    id?: true
    desc?: true
    studentId?: true
    teacherId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    lessonsId?: true
  }

  export type AttendancesMaxAggregateInputType = {
    id?: true
    desc?: true
    studentId?: true
    teacherId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    lessonsId?: true
  }

  export type AttendancesCountAggregateInputType = {
    id?: true
    desc?: true
    studentId?: true
    teacherId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    lessonsId?: true
    _all?: true
  }

  export type AttendancesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to aggregate.
     */
    where?: AttendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendancesOrderByWithRelationInput | AttendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendancesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendancesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendancesMaxAggregateInputType
  }

  export type GetAttendancesAggregateType<T extends AttendancesAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendances]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendances[P]>
      : GetScalarType<T[P], AggregateAttendances[P]>
  }




  export type AttendancesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendancesWhereInput
    orderBy?: AttendancesOrderByWithAggregationInput | AttendancesOrderByWithAggregationInput[]
    by: AttendancesScalarFieldEnum[] | AttendancesScalarFieldEnum
    having?: AttendancesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendancesCountAggregateInputType | true
    _min?: AttendancesMinAggregateInputType
    _max?: AttendancesMaxAggregateInputType
  }

  export type AttendancesGroupByOutputType = {
    id: string
    desc: string
    studentId: string | null
    teacherId: string | null
    date: Date
    createdAt: Date
    updatedAt: Date
    lessonsId: string | null
    _count: AttendancesCountAggregateOutputType | null
    _min: AttendancesMinAggregateOutputType | null
    _max: AttendancesMaxAggregateOutputType | null
  }

  type GetAttendancesGroupByPayload<T extends AttendancesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendancesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendancesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendancesGroupByOutputType[P]>
            : GetScalarType<T[P], AttendancesGroupByOutputType[P]>
        }
      >
    >


  export type AttendancesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    desc?: boolean
    studentId?: boolean
    teacherId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lessonsId?: boolean
    student?: boolean | Attendances$studentArgs<ExtArgs>
    teacher?: boolean | Attendances$teacherArgs<ExtArgs>
    lessons?: boolean | Attendances$lessonsArgs<ExtArgs>
  }, ExtArgs["result"]["attendances"]>

  export type AttendancesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    desc?: boolean
    studentId?: boolean
    teacherId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lessonsId?: boolean
    student?: boolean | Attendances$studentArgs<ExtArgs>
    teacher?: boolean | Attendances$teacherArgs<ExtArgs>
    lessons?: boolean | Attendances$lessonsArgs<ExtArgs>
  }, ExtArgs["result"]["attendances"]>

  export type AttendancesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    desc?: boolean
    studentId?: boolean
    teacherId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lessonsId?: boolean
    student?: boolean | Attendances$studentArgs<ExtArgs>
    teacher?: boolean | Attendances$teacherArgs<ExtArgs>
    lessons?: boolean | Attendances$lessonsArgs<ExtArgs>
  }, ExtArgs["result"]["attendances"]>

  export type AttendancesSelectScalar = {
    id?: boolean
    desc?: boolean
    studentId?: boolean
    teacherId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lessonsId?: boolean
  }

  export type AttendancesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "desc" | "studentId" | "teacherId" | "date" | "createdAt" | "updatedAt" | "lessonsId", ExtArgs["result"]["attendances"]>
  export type AttendancesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Attendances$studentArgs<ExtArgs>
    teacher?: boolean | Attendances$teacherArgs<ExtArgs>
    lessons?: boolean | Attendances$lessonsArgs<ExtArgs>
  }
  export type AttendancesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Attendances$studentArgs<ExtArgs>
    teacher?: boolean | Attendances$teacherArgs<ExtArgs>
    lessons?: boolean | Attendances$lessonsArgs<ExtArgs>
  }
  export type AttendancesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Attendances$studentArgs<ExtArgs>
    teacher?: boolean | Attendances$teacherArgs<ExtArgs>
    lessons?: boolean | Attendances$lessonsArgs<ExtArgs>
  }

  export type $AttendancesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendances"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs> | null
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
      lessons: Prisma.$LessonsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      desc: string
      studentId: string | null
      teacherId: string | null
      date: Date
      createdAt: Date
      updatedAt: Date
      lessonsId: string | null
    }, ExtArgs["result"]["attendances"]>
    composites: {}
  }

  type AttendancesGetPayload<S extends boolean | null | undefined | AttendancesDefaultArgs> = $Result.GetResult<Prisma.$AttendancesPayload, S>

  type AttendancesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttendancesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttendancesCountAggregateInputType | true
    }

  export interface AttendancesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendances'], meta: { name: 'Attendances' } }
    /**
     * Find zero or one Attendances that matches the filter.
     * @param {AttendancesFindUniqueArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendancesFindUniqueArgs>(args: SelectSubset<T, AttendancesFindUniqueArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Attendances that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttendancesFindUniqueOrThrowArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendancesFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendancesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesFindFirstArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendancesFindFirstArgs>(args?: SelectSubset<T, AttendancesFindFirstArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Attendances that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesFindFirstOrThrowArgs} args - Arguments to find a Attendances
     * @example
     * // Get one Attendances
     * const attendances = await prisma.attendances.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendancesFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendancesFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendances.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendances.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendancesWithIdOnly = await prisma.attendances.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendancesFindManyArgs>(args?: SelectSubset<T, AttendancesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Attendances.
     * @param {AttendancesCreateArgs} args - Arguments to create a Attendances.
     * @example
     * // Create one Attendances
     * const Attendances = await prisma.attendances.create({
     *   data: {
     *     // ... data to create a Attendances
     *   }
     * })
     * 
     */
    create<T extends AttendancesCreateArgs>(args: SelectSubset<T, AttendancesCreateArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Attendances.
     * @param {AttendancesCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendances = await prisma.attendances.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendancesCreateManyArgs>(args?: SelectSubset<T, AttendancesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendancesCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendances = await prisma.attendances.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendancesWithIdOnly = await prisma.attendances.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendancesCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendancesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Attendances.
     * @param {AttendancesDeleteArgs} args - Arguments to delete one Attendances.
     * @example
     * // Delete one Attendances
     * const Attendances = await prisma.attendances.delete({
     *   where: {
     *     // ... filter to delete one Attendances
     *   }
     * })
     * 
     */
    delete<T extends AttendancesDeleteArgs>(args: SelectSubset<T, AttendancesDeleteArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Attendances.
     * @param {AttendancesUpdateArgs} args - Arguments to update one Attendances.
     * @example
     * // Update one Attendances
     * const attendances = await prisma.attendances.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendancesUpdateArgs>(args: SelectSubset<T, AttendancesUpdateArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Attendances.
     * @param {AttendancesDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendances.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendancesDeleteManyArgs>(args?: SelectSubset<T, AttendancesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendances = await prisma.attendances.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendancesUpdateManyArgs>(args: SelectSubset<T, AttendancesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances and returns the data updated in the database.
     * @param {AttendancesUpdateManyAndReturnArgs} args - Arguments to update many Attendances.
     * @example
     * // Update many Attendances
     * const attendances = await prisma.attendances.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Attendances and only return the `id`
     * const attendancesWithIdOnly = await prisma.attendances.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AttendancesUpdateManyAndReturnArgs>(args: SelectSubset<T, AttendancesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Attendances.
     * @param {AttendancesUpsertArgs} args - Arguments to update or create a Attendances.
     * @example
     * // Update or create a Attendances
     * const attendances = await prisma.attendances.upsert({
     *   create: {
     *     // ... data to create a Attendances
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendances we want to update
     *   }
     * })
     */
    upsert<T extends AttendancesUpsertArgs>(args: SelectSubset<T, AttendancesUpsertArgs<ExtArgs>>): Prisma__AttendancesClient<$Result.GetResult<Prisma.$AttendancesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendances.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendancesCountArgs>(
      args?: Subset<T, AttendancesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendancesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttendancesAggregateArgs>(args: Subset<T, AttendancesAggregateArgs>): Prisma.PrismaPromise<GetAttendancesAggregateType<T>>

    /**
     * Group by Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendancesGroupByArgs} args - Group by arguments.
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
      T extends AttendancesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendancesGroupByArgs['orderBy'] }
        : { orderBy?: AttendancesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttendancesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendancesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendances model
   */
  readonly fields: AttendancesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendances.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendancesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends Attendances$studentArgs<ExtArgs> = {}>(args?: Subset<T, Attendances$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    teacher<T extends Attendances$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Attendances$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    lessons<T extends Attendances$lessonsArgs<ExtArgs> = {}>(args?: Subset<T, Attendances$lessonsArgs<ExtArgs>>): Prisma__LessonsClient<$Result.GetResult<Prisma.$LessonsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Attendances model
   */
  interface AttendancesFieldRefs {
    readonly id: FieldRef<"Attendances", 'String'>
    readonly desc: FieldRef<"Attendances", 'String'>
    readonly studentId: FieldRef<"Attendances", 'String'>
    readonly teacherId: FieldRef<"Attendances", 'String'>
    readonly date: FieldRef<"Attendances", 'DateTime'>
    readonly createdAt: FieldRef<"Attendances", 'DateTime'>
    readonly updatedAt: FieldRef<"Attendances", 'DateTime'>
    readonly lessonsId: FieldRef<"Attendances", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Attendances findUnique
   */
  export type AttendancesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where: AttendancesWhereUniqueInput
  }

  /**
   * Attendances findUniqueOrThrow
   */
  export type AttendancesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where: AttendancesWhereUniqueInput
  }

  /**
   * Attendances findFirst
   */
  export type AttendancesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendancesOrderByWithRelationInput | AttendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * Attendances findFirstOrThrow
   */
  export type AttendancesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendancesOrderByWithRelationInput | AttendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * Attendances findMany
   */
  export type AttendancesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendancesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendancesOrderByWithRelationInput | AttendancesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendancesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendancesScalarFieldEnum | AttendancesScalarFieldEnum[]
  }

  /**
   * Attendances create
   */
  export type AttendancesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendances.
     */
    data: XOR<AttendancesCreateInput, AttendancesUncheckedCreateInput>
  }

  /**
   * Attendances createMany
   */
  export type AttendancesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendancesCreateManyInput | AttendancesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attendances createManyAndReturn
   */
  export type AttendancesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendancesCreateManyInput | AttendancesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendances update
   */
  export type AttendancesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendances.
     */
    data: XOR<AttendancesUpdateInput, AttendancesUncheckedUpdateInput>
    /**
     * Choose, which Attendances to update.
     */
    where: AttendancesWhereUniqueInput
  }

  /**
   * Attendances updateMany
   */
  export type AttendancesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendancesUpdateManyMutationInput, AttendancesUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendancesWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
  }

  /**
   * Attendances updateManyAndReturn
   */
  export type AttendancesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendancesUpdateManyMutationInput, AttendancesUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendancesWhereInput
    /**
     * Limit how many Attendances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendances upsert
   */
  export type AttendancesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendances to update in case it exists.
     */
    where: AttendancesWhereUniqueInput
    /**
     * In case the Attendances found by the `where` argument doesn't exist, create a new Attendances with this data.
     */
    create: XOR<AttendancesCreateInput, AttendancesUncheckedCreateInput>
    /**
     * In case the Attendances was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendancesUpdateInput, AttendancesUncheckedUpdateInput>
  }

  /**
   * Attendances delete
   */
  export type AttendancesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
    /**
     * Filter which Attendances to delete.
     */
    where: AttendancesWhereUniqueInput
  }

  /**
   * Attendances deleteMany
   */
  export type AttendancesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendancesWhereInput
    /**
     * Limit how many Attendances to delete.
     */
    limit?: number
  }

  /**
   * Attendances.student
   */
  export type Attendances$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * Attendances.teacher
   */
  export type Attendances$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * Attendances.lessons
   */
  export type Attendances$lessonsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lessons
     */
    select?: LessonsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lessons
     */
    omit?: LessonsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LessonsInclude<ExtArgs> | null
    where?: LessonsWhereInput
  }

  /**
   * Attendances without action
   */
  export type AttendancesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendances
     */
    select?: AttendancesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Attendances
     */
    omit?: AttendancesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendancesInclude<ExtArgs> | null
  }


  /**
   * Model Payments
   */

  export type AggregatePayments = {
    _count: PaymentsCountAggregateOutputType | null
    _min: PaymentsMinAggregateOutputType | null
    _max: PaymentsMaxAggregateOutputType | null
  }

  export type PaymentsMinAggregateOutputType = {
    id: string | null
    date: Date | null
    groupId: string | null
    desc: string | null
    amount: string | null
    createdAt: Date | null
    updatedAt: Date | null
    studentId: string | null
  }

  export type PaymentsMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    groupId: string | null
    desc: string | null
    amount: string | null
    createdAt: Date | null
    updatedAt: Date | null
    studentId: string | null
  }

  export type PaymentsCountAggregateOutputType = {
    id: number
    date: number
    groupId: number
    desc: number
    amount: number
    createdAt: number
    updatedAt: number
    studentId: number
    _all: number
  }


  export type PaymentsMinAggregateInputType = {
    id?: true
    date?: true
    groupId?: true
    desc?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
    studentId?: true
  }

  export type PaymentsMaxAggregateInputType = {
    id?: true
    date?: true
    groupId?: true
    desc?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
    studentId?: true
  }

  export type PaymentsCountAggregateInputType = {
    id?: true
    date?: true
    groupId?: true
    desc?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
    studentId?: true
    _all?: true
  }

  export type PaymentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to aggregate.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentsWhereUniqueInput
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
    _count?: true | PaymentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentsMaxAggregateInputType
  }

  export type GetPaymentsAggregateType<T extends PaymentsAggregateArgs> = {
        [P in keyof T & keyof AggregatePayments]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayments[P]>
      : GetScalarType<T[P], AggregatePayments[P]>
  }




  export type PaymentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentsWhereInput
    orderBy?: PaymentsOrderByWithAggregationInput | PaymentsOrderByWithAggregationInput[]
    by: PaymentsScalarFieldEnum[] | PaymentsScalarFieldEnum
    having?: PaymentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentsCountAggregateInputType | true
    _min?: PaymentsMinAggregateInputType
    _max?: PaymentsMaxAggregateInputType
  }

  export type PaymentsGroupByOutputType = {
    id: string
    date: Date
    groupId: string | null
    desc: string
    amount: string
    createdAt: Date
    updatedAt: Date
    studentId: string | null
    _count: PaymentsCountAggregateOutputType | null
    _min: PaymentsMinAggregateOutputType | null
    _max: PaymentsMaxAggregateOutputType | null
  }

  type GetPaymentsGroupByPayload<T extends PaymentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentsGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentsGroupByOutputType[P]>
        }
      >
    >


  export type PaymentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    groupId?: boolean
    desc?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
    group?: boolean | Payments$groupArgs<ExtArgs>
    student?: boolean | Payments$studentArgs<ExtArgs>
  }, ExtArgs["result"]["payments"]>

  export type PaymentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    groupId?: boolean
    desc?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
    group?: boolean | Payments$groupArgs<ExtArgs>
    student?: boolean | Payments$studentArgs<ExtArgs>
  }, ExtArgs["result"]["payments"]>

  export type PaymentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    groupId?: boolean
    desc?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
    group?: boolean | Payments$groupArgs<ExtArgs>
    student?: boolean | Payments$studentArgs<ExtArgs>
  }, ExtArgs["result"]["payments"]>

  export type PaymentsSelectScalar = {
    id?: boolean
    date?: boolean
    groupId?: boolean
    desc?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    studentId?: boolean
  }

  export type PaymentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "groupId" | "desc" | "amount" | "createdAt" | "updatedAt" | "studentId", ExtArgs["result"]["payments"]>
  export type PaymentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Payments$groupArgs<ExtArgs>
    student?: boolean | Payments$studentArgs<ExtArgs>
  }
  export type PaymentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Payments$groupArgs<ExtArgs>
    student?: boolean | Payments$studentArgs<ExtArgs>
  }
  export type PaymentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | Payments$groupArgs<ExtArgs>
    student?: boolean | Payments$studentArgs<ExtArgs>
  }

  export type $PaymentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payments"
    objects: {
      group: Prisma.$GroupsPayload<ExtArgs> | null
      student: Prisma.$StudentPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      groupId: string | null
      desc: string
      amount: string
      createdAt: Date
      updatedAt: Date
      studentId: string | null
    }, ExtArgs["result"]["payments"]>
    composites: {}
  }

  type PaymentsGetPayload<S extends boolean | null | undefined | PaymentsDefaultArgs> = $Result.GetResult<Prisma.$PaymentsPayload, S>

  type PaymentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentsCountAggregateInputType | true
    }

  export interface PaymentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payments'], meta: { name: 'Payments' } }
    /**
     * Find zero or one Payments that matches the filter.
     * @param {PaymentsFindUniqueArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentsFindUniqueArgs>(args: SelectSubset<T, PaymentsFindUniqueArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentsFindUniqueOrThrowArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentsFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsFindFirstArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentsFindFirstArgs>(args?: SelectSubset<T, PaymentsFindFirstArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsFindFirstOrThrowArgs} args - Arguments to find a Payments
     * @example
     * // Get one Payments
     * const payments = await prisma.payments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentsFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payments.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payments.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentsWithIdOnly = await prisma.payments.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentsFindManyArgs>(args?: SelectSubset<T, PaymentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payments.
     * @param {PaymentsCreateArgs} args - Arguments to create a Payments.
     * @example
     * // Create one Payments
     * const Payments = await prisma.payments.create({
     *   data: {
     *     // ... data to create a Payments
     *   }
     * })
     * 
     */
    create<T extends PaymentsCreateArgs>(args: SelectSubset<T, PaymentsCreateArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentsCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payments = await prisma.payments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentsCreateManyArgs>(args?: SelectSubset<T, PaymentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentsCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payments = await prisma.payments.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentsWithIdOnly = await prisma.payments.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentsCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payments.
     * @param {PaymentsDeleteArgs} args - Arguments to delete one Payments.
     * @example
     * // Delete one Payments
     * const Payments = await prisma.payments.delete({
     *   where: {
     *     // ... filter to delete one Payments
     *   }
     * })
     * 
     */
    delete<T extends PaymentsDeleteArgs>(args: SelectSubset<T, PaymentsDeleteArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payments.
     * @param {PaymentsUpdateArgs} args - Arguments to update one Payments.
     * @example
     * // Update one Payments
     * const payments = await prisma.payments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentsUpdateArgs>(args: SelectSubset<T, PaymentsUpdateArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentsDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentsDeleteManyArgs>(args?: SelectSubset<T, PaymentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payments = await prisma.payments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentsUpdateManyArgs>(args: SelectSubset<T, PaymentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentsUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payments = await prisma.payments.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentsWithIdOnly = await prisma.payments.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentsUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payments.
     * @param {PaymentsUpsertArgs} args - Arguments to update or create a Payments.
     * @example
     * // Update or create a Payments
     * const payments = await prisma.payments.upsert({
     *   create: {
     *     // ... data to create a Payments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payments we want to update
     *   }
     * })
     */
    upsert<T extends PaymentsUpsertArgs>(args: SelectSubset<T, PaymentsUpsertArgs<ExtArgs>>): Prisma__PaymentsClient<$Result.GetResult<Prisma.$PaymentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payments.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentsCountArgs>(
      args?: Subset<T, PaymentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentsAggregateArgs>(args: Subset<T, PaymentsAggregateArgs>): Prisma.PrismaPromise<GetPaymentsAggregateType<T>>

    /**
     * Group by Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentsGroupByArgs} args - Group by arguments.
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
      T extends PaymentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentsGroupByArgs['orderBy'] }
        : { orderBy?: PaymentsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payments model
   */
  readonly fields: PaymentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends Payments$groupArgs<ExtArgs> = {}>(args?: Subset<T, Payments$groupArgs<ExtArgs>>): Prisma__GroupsClient<$Result.GetResult<Prisma.$GroupsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    student<T extends Payments$studentArgs<ExtArgs> = {}>(args?: Subset<T, Payments$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Payments model
   */
  interface PaymentsFieldRefs {
    readonly id: FieldRef<"Payments", 'String'>
    readonly date: FieldRef<"Payments", 'DateTime'>
    readonly groupId: FieldRef<"Payments", 'String'>
    readonly desc: FieldRef<"Payments", 'String'>
    readonly amount: FieldRef<"Payments", 'String'>
    readonly createdAt: FieldRef<"Payments", 'DateTime'>
    readonly updatedAt: FieldRef<"Payments", 'DateTime'>
    readonly studentId: FieldRef<"Payments", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payments findUnique
   */
  export type PaymentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments findUniqueOrThrow
   */
  export type PaymentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments findFirst
   */
  export type PaymentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentsWhereUniqueInput
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
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Payments findFirstOrThrow
   */
  export type PaymentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentsWhereUniqueInput
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
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Payments findMany
   */
  export type PaymentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentsOrderByWithRelationInput | PaymentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentsWhereUniqueInput
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
    distinct?: PaymentsScalarFieldEnum | PaymentsScalarFieldEnum[]
  }

  /**
   * Payments create
   */
  export type PaymentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * The data needed to create a Payments.
     */
    data: XOR<PaymentsCreateInput, PaymentsUncheckedCreateInput>
  }

  /**
   * Payments createMany
   */
  export type PaymentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentsCreateManyInput | PaymentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payments createManyAndReturn
   */
  export type PaymentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentsCreateManyInput | PaymentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payments update
   */
  export type PaymentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * The data needed to update a Payments.
     */
    data: XOR<PaymentsUpdateInput, PaymentsUncheckedUpdateInput>
    /**
     * Choose, which Payments to update.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments updateMany
   */
  export type PaymentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentsUpdateManyMutationInput, PaymentsUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentsWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payments updateManyAndReturn
   */
  export type PaymentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentsUpdateManyMutationInput, PaymentsUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentsWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payments upsert
   */
  export type PaymentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * The filter to search for the Payments to update in case it exists.
     */
    where: PaymentsWhereUniqueInput
    /**
     * In case the Payments found by the `where` argument doesn't exist, create a new Payments with this data.
     */
    create: XOR<PaymentsCreateInput, PaymentsUncheckedCreateInput>
    /**
     * In case the Payments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentsUpdateInput, PaymentsUncheckedUpdateInput>
  }

  /**
   * Payments delete
   */
  export type PaymentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
    /**
     * Filter which Payments to delete.
     */
    where: PaymentsWhereUniqueInput
  }

  /**
   * Payments deleteMany
   */
  export type PaymentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentsWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payments.group
   */
  export type Payments$groupArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Groups
     */
    select?: GroupsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Groups
     */
    omit?: GroupsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupsInclude<ExtArgs> | null
    where?: GroupsWhereInput
  }

  /**
   * Payments.student
   */
  export type Payments$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * Payments without action
   */
  export type PaymentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payments
     */
    select?: PaymentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payments
     */
    omit?: PaymentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentsInclude<ExtArgs> | null
  }


  /**
   * Model cameFrom
   */

  export type AggregateCameFrom = {
    _count: CameFromCountAggregateOutputType | null
    _min: CameFromMinAggregateOutputType | null
    _max: CameFromMaxAggregateOutputType | null
  }

  export type CameFromMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CameFromMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CameFromCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CameFromMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CameFromMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CameFromCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CameFromAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cameFrom to aggregate.
     */
    where?: cameFromWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cameFroms to fetch.
     */
    orderBy?: cameFromOrderByWithRelationInput | cameFromOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cameFromWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cameFroms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cameFroms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cameFroms
    **/
    _count?: true | CameFromCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CameFromMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CameFromMaxAggregateInputType
  }

  export type GetCameFromAggregateType<T extends CameFromAggregateArgs> = {
        [P in keyof T & keyof AggregateCameFrom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCameFrom[P]>
      : GetScalarType<T[P], AggregateCameFrom[P]>
  }




  export type cameFromGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cameFromWhereInput
    orderBy?: cameFromOrderByWithAggregationInput | cameFromOrderByWithAggregationInput[]
    by: CameFromScalarFieldEnum[] | CameFromScalarFieldEnum
    having?: cameFromScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CameFromCountAggregateInputType | true
    _min?: CameFromMinAggregateInputType
    _max?: CameFromMaxAggregateInputType
  }

  export type CameFromGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CameFromCountAggregateOutputType | null
    _min: CameFromMinAggregateOutputType | null
    _max: CameFromMaxAggregateOutputType | null
  }

  type GetCameFromGroupByPayload<T extends cameFromGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CameFromGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CameFromGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CameFromGroupByOutputType[P]>
            : GetScalarType<T[P], CameFromGroupByOutputType[P]>
        }
      >
    >


  export type cameFromSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    students?: boolean | cameFrom$studentsArgs<ExtArgs>
    _count?: boolean | CameFromCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cameFrom"]>

  export type cameFromSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cameFrom"]>

  export type cameFromSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cameFrom"]>

  export type cameFromSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type cameFromOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["cameFrom"]>
  export type cameFromInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | cameFrom$studentsArgs<ExtArgs>
    _count?: boolean | CameFromCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type cameFromIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type cameFromIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $cameFromPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cameFrom"
    objects: {
      students: Prisma.$StudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cameFrom"]>
    composites: {}
  }

  type cameFromGetPayload<S extends boolean | null | undefined | cameFromDefaultArgs> = $Result.GetResult<Prisma.$cameFromPayload, S>

  type cameFromCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cameFromFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CameFromCountAggregateInputType | true
    }

  export interface cameFromDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cameFrom'], meta: { name: 'cameFrom' } }
    /**
     * Find zero or one CameFrom that matches the filter.
     * @param {cameFromFindUniqueArgs} args - Arguments to find a CameFrom
     * @example
     * // Get one CameFrom
     * const cameFrom = await prisma.cameFrom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cameFromFindUniqueArgs>(args: SelectSubset<T, cameFromFindUniqueArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CameFrom that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cameFromFindUniqueOrThrowArgs} args - Arguments to find a CameFrom
     * @example
     * // Get one CameFrom
     * const cameFrom = await prisma.cameFrom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cameFromFindUniqueOrThrowArgs>(args: SelectSubset<T, cameFromFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CameFrom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cameFromFindFirstArgs} args - Arguments to find a CameFrom
     * @example
     * // Get one CameFrom
     * const cameFrom = await prisma.cameFrom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cameFromFindFirstArgs>(args?: SelectSubset<T, cameFromFindFirstArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CameFrom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cameFromFindFirstOrThrowArgs} args - Arguments to find a CameFrom
     * @example
     * // Get one CameFrom
     * const cameFrom = await prisma.cameFrom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cameFromFindFirstOrThrowArgs>(args?: SelectSubset<T, cameFromFindFirstOrThrowArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CameFroms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cameFromFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CameFroms
     * const cameFroms = await prisma.cameFrom.findMany()
     * 
     * // Get first 10 CameFroms
     * const cameFroms = await prisma.cameFrom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cameFromWithIdOnly = await prisma.cameFrom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cameFromFindManyArgs>(args?: SelectSubset<T, cameFromFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CameFrom.
     * @param {cameFromCreateArgs} args - Arguments to create a CameFrom.
     * @example
     * // Create one CameFrom
     * const CameFrom = await prisma.cameFrom.create({
     *   data: {
     *     // ... data to create a CameFrom
     *   }
     * })
     * 
     */
    create<T extends cameFromCreateArgs>(args: SelectSubset<T, cameFromCreateArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CameFroms.
     * @param {cameFromCreateManyArgs} args - Arguments to create many CameFroms.
     * @example
     * // Create many CameFroms
     * const cameFrom = await prisma.cameFrom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cameFromCreateManyArgs>(args?: SelectSubset<T, cameFromCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CameFroms and returns the data saved in the database.
     * @param {cameFromCreateManyAndReturnArgs} args - Arguments to create many CameFroms.
     * @example
     * // Create many CameFroms
     * const cameFrom = await prisma.cameFrom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CameFroms and only return the `id`
     * const cameFromWithIdOnly = await prisma.cameFrom.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cameFromCreateManyAndReturnArgs>(args?: SelectSubset<T, cameFromCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CameFrom.
     * @param {cameFromDeleteArgs} args - Arguments to delete one CameFrom.
     * @example
     * // Delete one CameFrom
     * const CameFrom = await prisma.cameFrom.delete({
     *   where: {
     *     // ... filter to delete one CameFrom
     *   }
     * })
     * 
     */
    delete<T extends cameFromDeleteArgs>(args: SelectSubset<T, cameFromDeleteArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CameFrom.
     * @param {cameFromUpdateArgs} args - Arguments to update one CameFrom.
     * @example
     * // Update one CameFrom
     * const cameFrom = await prisma.cameFrom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cameFromUpdateArgs>(args: SelectSubset<T, cameFromUpdateArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CameFroms.
     * @param {cameFromDeleteManyArgs} args - Arguments to filter CameFroms to delete.
     * @example
     * // Delete a few CameFroms
     * const { count } = await prisma.cameFrom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cameFromDeleteManyArgs>(args?: SelectSubset<T, cameFromDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CameFroms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cameFromUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CameFroms
     * const cameFrom = await prisma.cameFrom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cameFromUpdateManyArgs>(args: SelectSubset<T, cameFromUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CameFroms and returns the data updated in the database.
     * @param {cameFromUpdateManyAndReturnArgs} args - Arguments to update many CameFroms.
     * @example
     * // Update many CameFroms
     * const cameFrom = await prisma.cameFrom.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CameFroms and only return the `id`
     * const cameFromWithIdOnly = await prisma.cameFrom.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cameFromUpdateManyAndReturnArgs>(args: SelectSubset<T, cameFromUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CameFrom.
     * @param {cameFromUpsertArgs} args - Arguments to update or create a CameFrom.
     * @example
     * // Update or create a CameFrom
     * const cameFrom = await prisma.cameFrom.upsert({
     *   create: {
     *     // ... data to create a CameFrom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CameFrom we want to update
     *   }
     * })
     */
    upsert<T extends cameFromUpsertArgs>(args: SelectSubset<T, cameFromUpsertArgs<ExtArgs>>): Prisma__cameFromClient<$Result.GetResult<Prisma.$cameFromPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CameFroms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cameFromCountArgs} args - Arguments to filter CameFroms to count.
     * @example
     * // Count the number of CameFroms
     * const count = await prisma.cameFrom.count({
     *   where: {
     *     // ... the filter for the CameFroms we want to count
     *   }
     * })
    **/
    count<T extends cameFromCountArgs>(
      args?: Subset<T, cameFromCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CameFromCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CameFrom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CameFromAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CameFromAggregateArgs>(args: Subset<T, CameFromAggregateArgs>): Prisma.PrismaPromise<GetCameFromAggregateType<T>>

    /**
     * Group by CameFrom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cameFromGroupByArgs} args - Group by arguments.
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
      T extends cameFromGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cameFromGroupByArgs['orderBy'] }
        : { orderBy?: cameFromGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, cameFromGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCameFromGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cameFrom model
   */
  readonly fields: cameFromFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cameFrom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cameFromClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    students<T extends cameFrom$studentsArgs<ExtArgs> = {}>(args?: Subset<T, cameFrom$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the cameFrom model
   */
  interface cameFromFieldRefs {
    readonly id: FieldRef<"cameFrom", 'String'>
    readonly name: FieldRef<"cameFrom", 'String'>
    readonly createdAt: FieldRef<"cameFrom", 'DateTime'>
    readonly updatedAt: FieldRef<"cameFrom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * cameFrom findUnique
   */
  export type cameFromFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * Filter, which cameFrom to fetch.
     */
    where: cameFromWhereUniqueInput
  }

  /**
   * cameFrom findUniqueOrThrow
   */
  export type cameFromFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * Filter, which cameFrom to fetch.
     */
    where: cameFromWhereUniqueInput
  }

  /**
   * cameFrom findFirst
   */
  export type cameFromFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * Filter, which cameFrom to fetch.
     */
    where?: cameFromWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cameFroms to fetch.
     */
    orderBy?: cameFromOrderByWithRelationInput | cameFromOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cameFroms.
     */
    cursor?: cameFromWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cameFroms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cameFroms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cameFroms.
     */
    distinct?: CameFromScalarFieldEnum | CameFromScalarFieldEnum[]
  }

  /**
   * cameFrom findFirstOrThrow
   */
  export type cameFromFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * Filter, which cameFrom to fetch.
     */
    where?: cameFromWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cameFroms to fetch.
     */
    orderBy?: cameFromOrderByWithRelationInput | cameFromOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cameFroms.
     */
    cursor?: cameFromWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cameFroms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cameFroms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cameFroms.
     */
    distinct?: CameFromScalarFieldEnum | CameFromScalarFieldEnum[]
  }

  /**
   * cameFrom findMany
   */
  export type cameFromFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * Filter, which cameFroms to fetch.
     */
    where?: cameFromWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cameFroms to fetch.
     */
    orderBy?: cameFromOrderByWithRelationInput | cameFromOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cameFroms.
     */
    cursor?: cameFromWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cameFroms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cameFroms.
     */
    skip?: number
    distinct?: CameFromScalarFieldEnum | CameFromScalarFieldEnum[]
  }

  /**
   * cameFrom create
   */
  export type cameFromCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * The data needed to create a cameFrom.
     */
    data: XOR<cameFromCreateInput, cameFromUncheckedCreateInput>
  }

  /**
   * cameFrom createMany
   */
  export type cameFromCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cameFroms.
     */
    data: cameFromCreateManyInput | cameFromCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cameFrom createManyAndReturn
   */
  export type cameFromCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * The data used to create many cameFroms.
     */
    data: cameFromCreateManyInput | cameFromCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cameFrom update
   */
  export type cameFromUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * The data needed to update a cameFrom.
     */
    data: XOR<cameFromUpdateInput, cameFromUncheckedUpdateInput>
    /**
     * Choose, which cameFrom to update.
     */
    where: cameFromWhereUniqueInput
  }

  /**
   * cameFrom updateMany
   */
  export type cameFromUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cameFroms.
     */
    data: XOR<cameFromUpdateManyMutationInput, cameFromUncheckedUpdateManyInput>
    /**
     * Filter which cameFroms to update
     */
    where?: cameFromWhereInput
    /**
     * Limit how many cameFroms to update.
     */
    limit?: number
  }

  /**
   * cameFrom updateManyAndReturn
   */
  export type cameFromUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * The data used to update cameFroms.
     */
    data: XOR<cameFromUpdateManyMutationInput, cameFromUncheckedUpdateManyInput>
    /**
     * Filter which cameFroms to update
     */
    where?: cameFromWhereInput
    /**
     * Limit how many cameFroms to update.
     */
    limit?: number
  }

  /**
   * cameFrom upsert
   */
  export type cameFromUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * The filter to search for the cameFrom to update in case it exists.
     */
    where: cameFromWhereUniqueInput
    /**
     * In case the cameFrom found by the `where` argument doesn't exist, create a new cameFrom with this data.
     */
    create: XOR<cameFromCreateInput, cameFromUncheckedCreateInput>
    /**
     * In case the cameFrom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cameFromUpdateInput, cameFromUncheckedUpdateInput>
  }

  /**
   * cameFrom delete
   */
  export type cameFromDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
    /**
     * Filter which cameFrom to delete.
     */
    where: cameFromWhereUniqueInput
  }

  /**
   * cameFrom deleteMany
   */
  export type cameFromDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cameFroms to delete
     */
    where?: cameFromWhereInput
    /**
     * Limit how many cameFroms to delete.
     */
    limit?: number
  }

  /**
   * cameFrom.students
   */
  export type cameFrom$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * cameFrom without action
   */
  export type cameFromDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cameFrom
     */
    select?: cameFromSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cameFrom
     */
    omit?: cameFromOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cameFromInclude<ExtArgs> | null
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


  export const StudentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    birthday: 'birthday',
    phone: 'phone',
    cameText: 'cameText',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    groupId: 'groupId'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const LogScalarFieldEnum: {
    id: 'id',
    message: 'message',
    level: 'level',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LogScalarFieldEnum = (typeof LogScalarFieldEnum)[keyof typeof LogScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    name: 'name',
    birthday: 'birthday',
    phone: 'phone',
    ratings: 'ratings',
    email: 'email',
    avatarUrl: 'avatarUrl',
    avatarFileId: 'avatarFileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const LessonsScalarFieldEnum: {
    id: 'id',
    desc: 'desc',
    daysOfWeek: 'daysOfWeek',
    groupId: 'groupId',
    teacherId: 'teacherId',
    startTime: 'startTime',
    endTime: 'endTime',
    room: 'room',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LessonsScalarFieldEnum = (typeof LessonsScalarFieldEnum)[keyof typeof LessonsScalarFieldEnum]


  export const GroupsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    courseId: 'courseId',
    teacherId: 'teacherId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupsScalarFieldEnum = (typeof GroupsScalarFieldEnum)[keyof typeof GroupsScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    name: 'name',
    birthday: 'birthday',
    email: 'email',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    desc: 'desc',
    price: 'price',
    subjectId: 'subjectId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const AttendancesScalarFieldEnum: {
    id: 'id',
    desc: 'desc',
    studentId: 'studentId',
    teacherId: 'teacherId',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lessonsId: 'lessonsId'
  };

  export type AttendancesScalarFieldEnum = (typeof AttendancesScalarFieldEnum)[keyof typeof AttendancesScalarFieldEnum]


  export const PaymentsScalarFieldEnum: {
    id: 'id',
    date: 'date',
    groupId: 'groupId',
    desc: 'desc',
    amount: 'amount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    studentId: 'studentId'
  };

  export type PaymentsScalarFieldEnum = (typeof PaymentsScalarFieldEnum)[keyof typeof PaymentsScalarFieldEnum]


  export const CameFromScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CameFromScalarFieldEnum = (typeof CameFromScalarFieldEnum)[keyof typeof CameFromScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DaysOfWeek[]'
   */
  export type ListEnumDaysOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DaysOfWeek[]'>
    


  /**
   * Reference to a field of type 'DaysOfWeek'
   */
  export type EnumDaysOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DaysOfWeek'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    birthday?: DateTimeFilter<"Student"> | Date | string
    phone?: StringFilter<"Student"> | string
    cameText?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    groupId?: StringNullableFilter<"Student"> | string | null
    courses?: CourseListRelationFilter
    cameFrom?: XOR<CameFromNullableScalarRelationFilter, cameFromWhereInput> | null
    group?: XOR<GroupsNullableScalarRelationFilter, GroupsWhereInput> | null
    attendances?: AttendancesListRelationFilter
    payments?: PaymentsListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    cameText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrderInput | SortOrder
    courses?: CourseOrderByRelationAggregateInput
    cameFrom?: cameFromOrderByWithRelationInput
    group?: GroupsOrderByWithRelationInput
    attendances?: AttendancesOrderByRelationAggregateInput
    payments?: PaymentsOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    birthday?: DateTimeFilter<"Student"> | Date | string
    phone?: StringFilter<"Student"> | string
    cameText?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    groupId?: StringNullableFilter<"Student"> | string | null
    courses?: CourseListRelationFilter
    cameFrom?: XOR<CameFromNullableScalarRelationFilter, cameFromWhereInput> | null
    group?: XOR<GroupsNullableScalarRelationFilter, GroupsWhereInput> | null
    attendances?: AttendancesListRelationFilter
    payments?: PaymentsListRelationFilter
  }, "id">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    cameText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrderInput | SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    birthday?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    phone?: StringWithAggregatesFilter<"Student"> | string
    cameText?: StringNullableWithAggregatesFilter<"Student"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    groupId?: StringNullableWithAggregatesFilter<"Student"> | string | null
  }

  export type LogWhereInput = {
    AND?: LogWhereInput | LogWhereInput[]
    OR?: LogWhereInput[]
    NOT?: LogWhereInput | LogWhereInput[]
    id?: StringFilter<"Log"> | string
    message?: StringFilter<"Log"> | string
    level?: StringFilter<"Log"> | string
    type?: StringFilter<"Log"> | string
    createdAt?: DateTimeFilter<"Log"> | Date | string
    updatedAt?: DateTimeFilter<"Log"> | Date | string
  }

  export type LogOrderByWithRelationInput = {
    id?: SortOrder
    message?: SortOrder
    level?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LogWhereInput | LogWhereInput[]
    OR?: LogWhereInput[]
    NOT?: LogWhereInput | LogWhereInput[]
    message?: StringFilter<"Log"> | string
    level?: StringFilter<"Log"> | string
    type?: StringFilter<"Log"> | string
    createdAt?: DateTimeFilter<"Log"> | Date | string
    updatedAt?: DateTimeFilter<"Log"> | Date | string
  }, "id">

  export type LogOrderByWithAggregationInput = {
    id?: SortOrder
    message?: SortOrder
    level?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LogCountOrderByAggregateInput
    _max?: LogMaxOrderByAggregateInput
    _min?: LogMinOrderByAggregateInput
  }

  export type LogScalarWhereWithAggregatesInput = {
    AND?: LogScalarWhereWithAggregatesInput | LogScalarWhereWithAggregatesInput[]
    OR?: LogScalarWhereWithAggregatesInput[]
    NOT?: LogScalarWhereWithAggregatesInput | LogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Log"> | string
    message?: StringWithAggregatesFilter<"Log"> | string
    level?: StringWithAggregatesFilter<"Log"> | string
    type?: StringWithAggregatesFilter<"Log"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Log"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Log"> | Date | string
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: StringFilter<"Teacher"> | string
    name?: StringFilter<"Teacher"> | string
    birthday?: DateTimeFilter<"Teacher"> | Date | string
    phone?: StringFilter<"Teacher"> | string
    ratings?: FloatNullableFilter<"Teacher"> | number | null
    email?: StringFilter<"Teacher"> | string
    avatarUrl?: StringFilter<"Teacher"> | string
    avatarFileId?: StringNullableFilter<"Teacher"> | string | null
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    subjects?: SubjectListRelationFilter
    courses?: CourseListRelationFilter
    group?: GroupsListRelationFilter
    attendances?: AttendancesListRelationFilter
    lessons?: LessonsListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    ratings?: SortOrderInput | SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    avatarFileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subjects?: SubjectOrderByRelationAggregateInput
    courses?: CourseOrderByRelationAggregateInput
    group?: GroupsOrderByRelationAggregateInput
    attendances?: AttendancesOrderByRelationAggregateInput
    lessons?: LessonsOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    name?: StringFilter<"Teacher"> | string
    birthday?: DateTimeFilter<"Teacher"> | Date | string
    phone?: StringFilter<"Teacher"> | string
    ratings?: FloatNullableFilter<"Teacher"> | number | null
    email?: StringFilter<"Teacher"> | string
    avatarUrl?: StringFilter<"Teacher"> | string
    avatarFileId?: StringNullableFilter<"Teacher"> | string | null
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    subjects?: SubjectListRelationFilter
    courses?: CourseListRelationFilter
    group?: GroupsListRelationFilter
    attendances?: AttendancesListRelationFilter
    lessons?: LessonsListRelationFilter
  }, "id">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    ratings?: SortOrderInput | SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    avatarFileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Teacher"> | string
    name?: StringWithAggregatesFilter<"Teacher"> | string
    birthday?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    phone?: StringWithAggregatesFilter<"Teacher"> | string
    ratings?: FloatNullableWithAggregatesFilter<"Teacher"> | number | null
    email?: StringWithAggregatesFilter<"Teacher"> | string
    avatarUrl?: StringWithAggregatesFilter<"Teacher"> | string
    avatarFileId?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
  }

  export type LessonsWhereInput = {
    AND?: LessonsWhereInput | LessonsWhereInput[]
    OR?: LessonsWhereInput[]
    NOT?: LessonsWhereInput | LessonsWhereInput[]
    id?: StringFilter<"Lessons"> | string
    desc?: StringFilter<"Lessons"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"Lessons">
    groupId?: StringNullableFilter<"Lessons"> | string | null
    teacherId?: StringNullableFilter<"Lessons"> | string | null
    startTime?: DateTimeFilter<"Lessons"> | Date | string
    endTime?: DateTimeFilter<"Lessons"> | Date | string
    room?: StringFilter<"Lessons"> | string
    createdAt?: DateTimeFilter<"Lessons"> | Date | string
    updatedAt?: DateTimeFilter<"Lessons"> | Date | string
    group?: XOR<GroupsNullableScalarRelationFilter, GroupsWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    attendance?: AttendancesListRelationFilter
  }

  export type LessonsOrderByWithRelationInput = {
    id?: SortOrder
    desc?: SortOrder
    daysOfWeek?: SortOrder
    groupId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    room?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    group?: GroupsOrderByWithRelationInput
    teacher?: TeacherOrderByWithRelationInput
    attendance?: AttendancesOrderByRelationAggregateInput
  }

  export type LessonsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LessonsWhereInput | LessonsWhereInput[]
    OR?: LessonsWhereInput[]
    NOT?: LessonsWhereInput | LessonsWhereInput[]
    desc?: StringFilter<"Lessons"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"Lessons">
    groupId?: StringNullableFilter<"Lessons"> | string | null
    teacherId?: StringNullableFilter<"Lessons"> | string | null
    startTime?: DateTimeFilter<"Lessons"> | Date | string
    endTime?: DateTimeFilter<"Lessons"> | Date | string
    room?: StringFilter<"Lessons"> | string
    createdAt?: DateTimeFilter<"Lessons"> | Date | string
    updatedAt?: DateTimeFilter<"Lessons"> | Date | string
    group?: XOR<GroupsNullableScalarRelationFilter, GroupsWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    attendance?: AttendancesListRelationFilter
  }, "id">

  export type LessonsOrderByWithAggregationInput = {
    id?: SortOrder
    desc?: SortOrder
    daysOfWeek?: SortOrder
    groupId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    room?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LessonsCountOrderByAggregateInput
    _max?: LessonsMaxOrderByAggregateInput
    _min?: LessonsMinOrderByAggregateInput
  }

  export type LessonsScalarWhereWithAggregatesInput = {
    AND?: LessonsScalarWhereWithAggregatesInput | LessonsScalarWhereWithAggregatesInput[]
    OR?: LessonsScalarWhereWithAggregatesInput[]
    NOT?: LessonsScalarWhereWithAggregatesInput | LessonsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lessons"> | string
    desc?: StringWithAggregatesFilter<"Lessons"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"Lessons">
    groupId?: StringNullableWithAggregatesFilter<"Lessons"> | string | null
    teacherId?: StringNullableWithAggregatesFilter<"Lessons"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"Lessons"> | Date | string
    endTime?: DateTimeWithAggregatesFilter<"Lessons"> | Date | string
    room?: StringWithAggregatesFilter<"Lessons"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lessons"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Lessons"> | Date | string
  }

  export type GroupsWhereInput = {
    AND?: GroupsWhereInput | GroupsWhereInput[]
    OR?: GroupsWhereInput[]
    NOT?: GroupsWhereInput | GroupsWhereInput[]
    id?: StringFilter<"Groups"> | string
    name?: StringFilter<"Groups"> | string
    courseId?: StringNullableFilter<"Groups"> | string | null
    teacherId?: StringNullableFilter<"Groups"> | string | null
    createdAt?: DateTimeFilter<"Groups"> | Date | string
    updatedAt?: DateTimeFilter<"Groups"> | Date | string
    students?: StudentListRelationFilter
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    payments?: PaymentsListRelationFilter
    lessons?: LessonsListRelationFilter
  }

  export type GroupsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    courseId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    students?: StudentOrderByRelationAggregateInput
    teacher?: TeacherOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    payments?: PaymentsOrderByRelationAggregateInput
    lessons?: LessonsOrderByRelationAggregateInput
  }

  export type GroupsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupsWhereInput | GroupsWhereInput[]
    OR?: GroupsWhereInput[]
    NOT?: GroupsWhereInput | GroupsWhereInput[]
    name?: StringFilter<"Groups"> | string
    courseId?: StringNullableFilter<"Groups"> | string | null
    teacherId?: StringNullableFilter<"Groups"> | string | null
    createdAt?: DateTimeFilter<"Groups"> | Date | string
    updatedAt?: DateTimeFilter<"Groups"> | Date | string
    students?: StudentListRelationFilter
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    course?: XOR<CourseNullableScalarRelationFilter, CourseWhereInput> | null
    payments?: PaymentsListRelationFilter
    lessons?: LessonsListRelationFilter
  }, "id">

  export type GroupsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    courseId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupsCountOrderByAggregateInput
    _max?: GroupsMaxOrderByAggregateInput
    _min?: GroupsMinOrderByAggregateInput
  }

  export type GroupsScalarWhereWithAggregatesInput = {
    AND?: GroupsScalarWhereWithAggregatesInput | GroupsScalarWhereWithAggregatesInput[]
    OR?: GroupsScalarWhereWithAggregatesInput[]
    NOT?: GroupsScalarWhereWithAggregatesInput | GroupsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Groups"> | string
    name?: StringWithAggregatesFilter<"Groups"> | string
    courseId?: StringNullableWithAggregatesFilter<"Groups"> | string | null
    teacherId?: StringNullableWithAggregatesFilter<"Groups"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Groups"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Groups"> | Date | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    birthday?: DateTimeFilter<"Admin"> | Date | string
    email?: StringFilter<"Admin"> | string
    avatarUrl?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    name?: StringFilter<"Admin"> | string
    birthday?: DateTimeFilter<"Admin"> | Date | string
    email?: StringFilter<"Admin"> | string
    avatarUrl?: StringFilter<"Admin"> | string
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
  }, "id">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    name?: StringWithAggregatesFilter<"Admin"> | string
    birthday?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    avatarUrl?: StringWithAggregatesFilter<"Admin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: StringFilter<"Subject"> | string
    name?: StringFilter<"Subject"> | string
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    teachers?: TeacherListRelationFilter
    courses?: CourseListRelationFilter
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    teachers?: TeacherOrderByRelationAggregateInput
    courses?: CourseOrderByRelationAggregateInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    name?: StringFilter<"Subject"> | string
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    teachers?: TeacherListRelationFilter
    courses?: CourseListRelationFilter
  }, "id">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subject"> | string
    name?: StringWithAggregatesFilter<"Subject"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    desc?: StringFilter<"Course"> | string
    price?: StringFilter<"Course"> | string
    subjectId?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    subject?: XOR<SubjectNullableScalarRelationFilter, SubjectWhereInput> | null
    teacher?: TeacherListRelationFilter
    students?: StudentListRelationFilter
    groups?: GroupsListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    price?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subject?: SubjectOrderByWithRelationInput
    teacher?: TeacherOrderByRelationAggregateInput
    students?: StudentOrderByRelationAggregateInput
    groups?: GroupsOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    name?: StringFilter<"Course"> | string
    desc?: StringFilter<"Course"> | string
    price?: StringFilter<"Course"> | string
    subjectId?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
    subject?: XOR<SubjectNullableScalarRelationFilter, SubjectWhereInput> | null
    teacher?: TeacherListRelationFilter
    students?: StudentListRelationFilter
    groups?: GroupsListRelationFilter
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    price?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Course"> | string
    name?: StringWithAggregatesFilter<"Course"> | string
    desc?: StringWithAggregatesFilter<"Course"> | string
    price?: StringWithAggregatesFilter<"Course"> | string
    subjectId?: StringNullableWithAggregatesFilter<"Course"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Course"> | Date | string
  }

  export type AttendancesWhereInput = {
    AND?: AttendancesWhereInput | AttendancesWhereInput[]
    OR?: AttendancesWhereInput[]
    NOT?: AttendancesWhereInput | AttendancesWhereInput[]
    id?: StringFilter<"Attendances"> | string
    desc?: StringFilter<"Attendances"> | string
    studentId?: StringNullableFilter<"Attendances"> | string | null
    teacherId?: StringNullableFilter<"Attendances"> | string | null
    date?: DateTimeFilter<"Attendances"> | Date | string
    createdAt?: DateTimeFilter<"Attendances"> | Date | string
    updatedAt?: DateTimeFilter<"Attendances"> | Date | string
    lessonsId?: StringNullableFilter<"Attendances"> | string | null
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    lessons?: XOR<LessonsNullableScalarRelationFilter, LessonsWhereInput> | null
  }

  export type AttendancesOrderByWithRelationInput = {
    id?: SortOrder
    desc?: SortOrder
    studentId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lessonsId?: SortOrderInput | SortOrder
    student?: StudentOrderByWithRelationInput
    teacher?: TeacherOrderByWithRelationInput
    lessons?: LessonsOrderByWithRelationInput
  }

  export type AttendancesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttendancesWhereInput | AttendancesWhereInput[]
    OR?: AttendancesWhereInput[]
    NOT?: AttendancesWhereInput | AttendancesWhereInput[]
    desc?: StringFilter<"Attendances"> | string
    studentId?: StringNullableFilter<"Attendances"> | string | null
    teacherId?: StringNullableFilter<"Attendances"> | string | null
    date?: DateTimeFilter<"Attendances"> | Date | string
    createdAt?: DateTimeFilter<"Attendances"> | Date | string
    updatedAt?: DateTimeFilter<"Attendances"> | Date | string
    lessonsId?: StringNullableFilter<"Attendances"> | string | null
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    lessons?: XOR<LessonsNullableScalarRelationFilter, LessonsWhereInput> | null
  }, "id">

  export type AttendancesOrderByWithAggregationInput = {
    id?: SortOrder
    desc?: SortOrder
    studentId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lessonsId?: SortOrderInput | SortOrder
    _count?: AttendancesCountOrderByAggregateInput
    _max?: AttendancesMaxOrderByAggregateInput
    _min?: AttendancesMinOrderByAggregateInput
  }

  export type AttendancesScalarWhereWithAggregatesInput = {
    AND?: AttendancesScalarWhereWithAggregatesInput | AttendancesScalarWhereWithAggregatesInput[]
    OR?: AttendancesScalarWhereWithAggregatesInput[]
    NOT?: AttendancesScalarWhereWithAggregatesInput | AttendancesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Attendances"> | string
    desc?: StringWithAggregatesFilter<"Attendances"> | string
    studentId?: StringNullableWithAggregatesFilter<"Attendances"> | string | null
    teacherId?: StringNullableWithAggregatesFilter<"Attendances"> | string | null
    date?: DateTimeWithAggregatesFilter<"Attendances"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Attendances"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Attendances"> | Date | string
    lessonsId?: StringNullableWithAggregatesFilter<"Attendances"> | string | null
  }

  export type PaymentsWhereInput = {
    AND?: PaymentsWhereInput | PaymentsWhereInput[]
    OR?: PaymentsWhereInput[]
    NOT?: PaymentsWhereInput | PaymentsWhereInput[]
    id?: StringFilter<"Payments"> | string
    date?: DateTimeFilter<"Payments"> | Date | string
    groupId?: StringNullableFilter<"Payments"> | string | null
    desc?: StringFilter<"Payments"> | string
    amount?: StringFilter<"Payments"> | string
    createdAt?: DateTimeFilter<"Payments"> | Date | string
    updatedAt?: DateTimeFilter<"Payments"> | Date | string
    studentId?: StringNullableFilter<"Payments"> | string | null
    group?: XOR<GroupsNullableScalarRelationFilter, GroupsWhereInput> | null
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
  }

  export type PaymentsOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    groupId?: SortOrderInput | SortOrder
    desc?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrderInput | SortOrder
    group?: GroupsOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
  }

  export type PaymentsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentsWhereInput | PaymentsWhereInput[]
    OR?: PaymentsWhereInput[]
    NOT?: PaymentsWhereInput | PaymentsWhereInput[]
    date?: DateTimeFilter<"Payments"> | Date | string
    groupId?: StringNullableFilter<"Payments"> | string | null
    desc?: StringFilter<"Payments"> | string
    amount?: StringFilter<"Payments"> | string
    createdAt?: DateTimeFilter<"Payments"> | Date | string
    updatedAt?: DateTimeFilter<"Payments"> | Date | string
    studentId?: StringNullableFilter<"Payments"> | string | null
    group?: XOR<GroupsNullableScalarRelationFilter, GroupsWhereInput> | null
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
  }, "id">

  export type PaymentsOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    groupId?: SortOrderInput | SortOrder
    desc?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrderInput | SortOrder
    _count?: PaymentsCountOrderByAggregateInput
    _max?: PaymentsMaxOrderByAggregateInput
    _min?: PaymentsMinOrderByAggregateInput
  }

  export type PaymentsScalarWhereWithAggregatesInput = {
    AND?: PaymentsScalarWhereWithAggregatesInput | PaymentsScalarWhereWithAggregatesInput[]
    OR?: PaymentsScalarWhereWithAggregatesInput[]
    NOT?: PaymentsScalarWhereWithAggregatesInput | PaymentsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payments"> | string
    date?: DateTimeWithAggregatesFilter<"Payments"> | Date | string
    groupId?: StringNullableWithAggregatesFilter<"Payments"> | string | null
    desc?: StringWithAggregatesFilter<"Payments"> | string
    amount?: StringWithAggregatesFilter<"Payments"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Payments"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payments"> | Date | string
    studentId?: StringNullableWithAggregatesFilter<"Payments"> | string | null
  }

  export type cameFromWhereInput = {
    AND?: cameFromWhereInput | cameFromWhereInput[]
    OR?: cameFromWhereInput[]
    NOT?: cameFromWhereInput | cameFromWhereInput[]
    id?: StringFilter<"cameFrom"> | string
    name?: StringFilter<"cameFrom"> | string
    createdAt?: DateTimeFilter<"cameFrom"> | Date | string
    updatedAt?: DateTimeFilter<"cameFrom"> | Date | string
    students?: StudentListRelationFilter
  }

  export type cameFromOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    students?: StudentOrderByRelationAggregateInput
  }

  export type cameFromWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: cameFromWhereInput | cameFromWhereInput[]
    OR?: cameFromWhereInput[]
    NOT?: cameFromWhereInput | cameFromWhereInput[]
    createdAt?: DateTimeFilter<"cameFrom"> | Date | string
    updatedAt?: DateTimeFilter<"cameFrom"> | Date | string
    students?: StudentListRelationFilter
  }, "id" | "name">

  export type cameFromOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: cameFromCountOrderByAggregateInput
    _max?: cameFromMaxOrderByAggregateInput
    _min?: cameFromMinOrderByAggregateInput
  }

  export type cameFromScalarWhereWithAggregatesInput = {
    AND?: cameFromScalarWhereWithAggregatesInput | cameFromScalarWhereWithAggregatesInput[]
    OR?: cameFromScalarWhereWithAggregatesInput[]
    NOT?: cameFromScalarWhereWithAggregatesInput | cameFromScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"cameFrom"> | string
    name?: StringWithAggregatesFilter<"cameFrom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"cameFrom"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"cameFrom"> | Date | string
  }

  export type StudentCreateInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutStudentsInput
    cameFrom?: cameFromCreateNestedOneWithoutStudentsInput
    group?: GroupsCreateNestedOneWithoutStudentsInput
    attendances?: AttendancesCreateNestedManyWithoutStudentInput
    payments?: PaymentsCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    cameText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutStudentsInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutStudentsNestedInput
    cameFrom?: cameFromUpdateOneWithoutStudentsNestedInput
    group?: GroupsUpdateOneWithoutStudentsNestedInput
    attendances?: AttendancesUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    cameText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: string | null
  }

  export type StudentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LogCreateInput = {
    id?: string
    message: string
    level: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LogUncheckedCreateInput = {
    id?: string
    message: string
    level: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogCreateManyInput = {
    id?: string
    message: string
    level: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherCreateInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutTeachersInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
    group?: GroupsCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesCreateNestedManyWithoutTeacherInput
    lessons?: LessonsCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutTeachersInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    group?: GroupsUncheckedCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutTeacherInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutTeachersNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    group?: GroupsUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutTeachersNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    group?: GroupsUncheckedUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonsCreateInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupsCreateNestedOneWithoutLessonsInput
    teacher?: TeacherCreateNestedOneWithoutLessonsInput
    attendance?: AttendancesCreateNestedManyWithoutLessonsInput
  }

  export type LessonsUncheckedCreateInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: string | null
    teacherId?: string | null
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendancesUncheckedCreateNestedManyWithoutLessonsInput
  }

  export type LessonsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupsUpdateOneWithoutLessonsNestedInput
    teacher?: TeacherUpdateOneWithoutLessonsNestedInput
    attendance?: AttendancesUpdateManyWithoutLessonsNestedInput
  }

  export type LessonsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendancesUncheckedUpdateManyWithoutLessonsNestedInput
  }

  export type LessonsCreateManyInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: string | null
    teacherId?: string | null
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LessonsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LessonsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupsCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutGroupInput
    teacher?: TeacherCreateNestedOneWithoutGroupInput
    course?: CourseCreateNestedOneWithoutGroupsInput
    payments?: PaymentsCreateNestedManyWithoutGroupInput
    lessons?: LessonsCreateNestedManyWithoutGroupInput
  }

  export type GroupsUncheckedCreateInput = {
    id?: string
    name: string
    courseId?: string | null
    teacherId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutGroupInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutGroupInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutGroupNestedInput
    teacher?: TeacherUpdateOneWithoutGroupNestedInput
    course?: CourseUpdateOneWithoutGroupsNestedInput
    payments?: PaymentsUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutGroupNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupsCreateManyInput = {
    id?: string
    name: string
    courseId?: string | null
    teacherId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateInput = {
    id?: string
    name: string
    birthday: Date | string
    email: string
    avatarUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    name: string
    birthday: Date | string
    email: string
    avatarUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminCreateManyInput = {
    id?: string
    name: string
    birthday: Date | string
    email: string
    avatarUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teachers?: TeacherCreateNestedManyWithoutSubjectsInput
    courses?: CourseCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teachers?: TeacherUncheckedCreateNestedManyWithoutSubjectsInput
    courses?: CourseUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teachers?: TeacherUpdateManyWithoutSubjectsNestedInput
    courses?: CourseUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teachers?: TeacherUncheckedUpdateManyWithoutSubjectsNestedInput
    courses?: CourseUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateInput = {
    id?: string
    name: string
    desc: string
    price: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subject?: SubjectCreateNestedOneWithoutCoursesInput
    teacher?: TeacherCreateNestedManyWithoutCoursesInput
    students?: StudentCreateNestedManyWithoutCoursesInput
    groups?: GroupsCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: string
    name: string
    desc: string
    price: string
    subjectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherUncheckedCreateNestedManyWithoutCoursesInput
    students?: StudentUncheckedCreateNestedManyWithoutCoursesInput
    groups?: GroupsUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneWithoutCoursesNestedInput
    teacher?: TeacherUpdateManyWithoutCoursesNestedInput
    students?: StudentUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUncheckedUpdateManyWithoutCoursesNestedInput
    students?: StudentUncheckedUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: string
    name: string
    desc: string
    price: string
    subjectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendancesCreateInput = {
    id?: string
    desc: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentCreateNestedOneWithoutAttendancesInput
    teacher?: TeacherCreateNestedOneWithoutAttendancesInput
    lessons?: LessonsCreateNestedOneWithoutAttendanceInput
  }

  export type AttendancesUncheckedCreateInput = {
    id?: string
    desc: string
    studentId?: string | null
    teacherId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonsId?: string | null
  }

  export type AttendancesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneWithoutAttendancesNestedInput
    teacher?: TeacherUpdateOneWithoutAttendancesNestedInput
    lessons?: LessonsUpdateOneWithoutAttendanceNestedInput
  }

  export type AttendancesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonsId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendancesCreateManyInput = {
    id?: string
    desc: string
    studentId?: string | null
    teacherId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonsId?: string | null
  }

  export type AttendancesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendancesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonsId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentsCreateInput = {
    id?: string
    date: Date | string
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupsCreateNestedOneWithoutPaymentsInput
    student?: StudentCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentsUncheckedCreateInput = {
    id?: string
    date: Date | string
    groupId?: string | null
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId?: string | null
  }

  export type PaymentsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupsUpdateOneWithoutPaymentsNestedInput
    student?: StudentUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentsCreateManyInput = {
    id?: string
    date: Date | string
    groupId?: string | null
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId?: string | null
  }

  export type PaymentsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cameFromCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutCameFromInput
  }

  export type cameFromUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutCameFromInput
  }

  export type cameFromUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutCameFromNestedInput
  }

  export type cameFromUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutCameFromNestedInput
  }

  export type cameFromCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type cameFromUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cameFromUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CourseListRelationFilter = {
    every?: CourseWhereInput
    some?: CourseWhereInput
    none?: CourseWhereInput
  }

  export type CameFromNullableScalarRelationFilter = {
    is?: cameFromWhereInput | null
    isNot?: cameFromWhereInput | null
  }

  export type GroupsNullableScalarRelationFilter = {
    is?: GroupsWhereInput | null
    isNot?: GroupsWhereInput | null
  }

  export type AttendancesListRelationFilter = {
    every?: AttendancesWhereInput
    some?: AttendancesWhereInput
    none?: AttendancesWhereInput
  }

  export type PaymentsListRelationFilter = {
    every?: PaymentsWhereInput
    some?: PaymentsWhereInput
    none?: PaymentsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttendancesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    cameText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    cameText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    cameText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    groupId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
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
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type LogCountOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    level?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LogMaxOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    level?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LogMinOrderByAggregateInput = {
    id?: SortOrder
    message?: SortOrder
    level?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SubjectListRelationFilter = {
    every?: SubjectWhereInput
    some?: SubjectWhereInput
    none?: SubjectWhereInput
  }

  export type GroupsListRelationFilter = {
    every?: GroupsWhereInput
    some?: GroupsWhereInput
    none?: GroupsWhereInput
  }

  export type LessonsListRelationFilter = {
    every?: LessonsWhereInput
    some?: LessonsWhereInput
    none?: LessonsWhereInput
  }

  export type SubjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LessonsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    ratings?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    avatarFileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    ratings?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    ratings?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    avatarFileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    phone?: SortOrder
    ratings?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    avatarFileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    ratings?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumDaysOfWeekNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.DaysOfWeek[] | ListEnumDaysOfWeekFieldRefInput<$PrismaModel> | null
    has?: $Enums.DaysOfWeek | EnumDaysOfWeekFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.DaysOfWeek[] | ListEnumDaysOfWeekFieldRefInput<$PrismaModel>
    hasSome?: $Enums.DaysOfWeek[] | ListEnumDaysOfWeekFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type TeacherNullableScalarRelationFilter = {
    is?: TeacherWhereInput | null
    isNot?: TeacherWhereInput | null
  }

  export type LessonsCountOrderByAggregateInput = {
    id?: SortOrder
    desc?: SortOrder
    daysOfWeek?: SortOrder
    groupId?: SortOrder
    teacherId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    room?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonsMaxOrderByAggregateInput = {
    id?: SortOrder
    desc?: SortOrder
    groupId?: SortOrder
    teacherId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    room?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LessonsMinOrderByAggregateInput = {
    id?: SortOrder
    desc?: SortOrder
    groupId?: SortOrder
    teacherId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    room?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type CourseNullableScalarRelationFilter = {
    is?: CourseWhereInput | null
    isNot?: CourseWhereInput | null
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    courseId?: SortOrder
    teacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthday?: SortOrder
    email?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherListRelationFilter = {
    every?: TeacherWhereInput
    some?: TeacherWhereInput
    none?: TeacherWhereInput
  }

  export type TeacherOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectNullableScalarRelationFilter = {
    is?: SubjectWhereInput | null
    isNot?: SubjectWhereInput | null
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    price?: SortOrder
    subjectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    price?: SortOrder
    subjectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    desc?: SortOrder
    price?: SortOrder
    subjectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentNullableScalarRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type LessonsNullableScalarRelationFilter = {
    is?: LessonsWhereInput | null
    isNot?: LessonsWhereInput | null
  }

  export type AttendancesCountOrderByAggregateInput = {
    id?: SortOrder
    desc?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lessonsId?: SortOrder
  }

  export type AttendancesMaxOrderByAggregateInput = {
    id?: SortOrder
    desc?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lessonsId?: SortOrder
  }

  export type AttendancesMinOrderByAggregateInput = {
    id?: SortOrder
    desc?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lessonsId?: SortOrder
  }

  export type PaymentsCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    groupId?: SortOrder
    desc?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
  }

  export type PaymentsMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    groupId?: SortOrder
    desc?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
  }

  export type PaymentsMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    groupId?: SortOrder
    desc?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    studentId?: SortOrder
  }

  export type cameFromCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type cameFromMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type cameFromMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CourseCreateNestedManyWithoutStudentsInput = {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type cameFromCreateNestedOneWithoutStudentsInput = {
    create?: XOR<cameFromCreateWithoutStudentsInput, cameFromUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: cameFromCreateOrConnectWithoutStudentsInput
    connect?: cameFromWhereUniqueInput
  }

  export type GroupsCreateNestedOneWithoutStudentsInput = {
    create?: XOR<GroupsCreateWithoutStudentsInput, GroupsUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: GroupsCreateOrConnectWithoutStudentsInput
    connect?: GroupsWhereUniqueInput
  }

  export type AttendancesCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendancesCreateWithoutStudentInput, AttendancesUncheckedCreateWithoutStudentInput> | AttendancesCreateWithoutStudentInput[] | AttendancesUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutStudentInput | AttendancesCreateOrConnectWithoutStudentInput[]
    createMany?: AttendancesCreateManyStudentInputEnvelope
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
  }

  export type PaymentsCreateNestedManyWithoutStudentInput = {
    create?: XOR<PaymentsCreateWithoutStudentInput, PaymentsUncheckedCreateWithoutStudentInput> | PaymentsCreateWithoutStudentInput[] | PaymentsUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutStudentInput | PaymentsCreateOrConnectWithoutStudentInput[]
    createMany?: PaymentsCreateManyStudentInputEnvelope
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutStudentsInput = {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type AttendancesUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendancesCreateWithoutStudentInput, AttendancesUncheckedCreateWithoutStudentInput> | AttendancesCreateWithoutStudentInput[] | AttendancesUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutStudentInput | AttendancesCreateOrConnectWithoutStudentInput[]
    createMany?: AttendancesCreateManyStudentInputEnvelope
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
  }

  export type PaymentsUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<PaymentsCreateWithoutStudentInput, PaymentsUncheckedCreateWithoutStudentInput> | PaymentsCreateWithoutStudentInput[] | PaymentsUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutStudentInput | PaymentsCreateOrConnectWithoutStudentInput[]
    createMany?: PaymentsCreateManyStudentInputEnvelope
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CourseUpdateManyWithoutStudentsNestedInput = {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutStudentsInput | CourseUpsertWithWhereUniqueWithoutStudentsInput[]
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutStudentsInput | CourseUpdateWithWhereUniqueWithoutStudentsInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutStudentsInput | CourseUpdateManyWithWhereWithoutStudentsInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type cameFromUpdateOneWithoutStudentsNestedInput = {
    create?: XOR<cameFromCreateWithoutStudentsInput, cameFromUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: cameFromCreateOrConnectWithoutStudentsInput
    upsert?: cameFromUpsertWithoutStudentsInput
    disconnect?: cameFromWhereInput | boolean
    delete?: cameFromWhereInput | boolean
    connect?: cameFromWhereUniqueInput
    update?: XOR<XOR<cameFromUpdateToOneWithWhereWithoutStudentsInput, cameFromUpdateWithoutStudentsInput>, cameFromUncheckedUpdateWithoutStudentsInput>
  }

  export type GroupsUpdateOneWithoutStudentsNestedInput = {
    create?: XOR<GroupsCreateWithoutStudentsInput, GroupsUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: GroupsCreateOrConnectWithoutStudentsInput
    upsert?: GroupsUpsertWithoutStudentsInput
    disconnect?: GroupsWhereInput | boolean
    delete?: GroupsWhereInput | boolean
    connect?: GroupsWhereUniqueInput
    update?: XOR<XOR<GroupsUpdateToOneWithWhereWithoutStudentsInput, GroupsUpdateWithoutStudentsInput>, GroupsUncheckedUpdateWithoutStudentsInput>
  }

  export type AttendancesUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendancesCreateWithoutStudentInput, AttendancesUncheckedCreateWithoutStudentInput> | AttendancesCreateWithoutStudentInput[] | AttendancesUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutStudentInput | AttendancesCreateOrConnectWithoutStudentInput[]
    upsert?: AttendancesUpsertWithWhereUniqueWithoutStudentInput | AttendancesUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendancesCreateManyStudentInputEnvelope
    set?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    disconnect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    delete?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    update?: AttendancesUpdateWithWhereUniqueWithoutStudentInput | AttendancesUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendancesUpdateManyWithWhereWithoutStudentInput | AttendancesUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
  }

  export type PaymentsUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PaymentsCreateWithoutStudentInput, PaymentsUncheckedCreateWithoutStudentInput> | PaymentsCreateWithoutStudentInput[] | PaymentsUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutStudentInput | PaymentsCreateOrConnectWithoutStudentInput[]
    upsert?: PaymentsUpsertWithWhereUniqueWithoutStudentInput | PaymentsUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PaymentsCreateManyStudentInputEnvelope
    set?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    disconnect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    delete?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    update?: PaymentsUpdateWithWhereUniqueWithoutStudentInput | PaymentsUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PaymentsUpdateManyWithWhereWithoutStudentInput | PaymentsUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CourseUncheckedUpdateManyWithoutStudentsNestedInput = {
    create?: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput> | CourseCreateWithoutStudentsInput[] | CourseUncheckedCreateWithoutStudentsInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutStudentsInput | CourseCreateOrConnectWithoutStudentsInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutStudentsInput | CourseUpsertWithWhereUniqueWithoutStudentsInput[]
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutStudentsInput | CourseUpdateWithWhereUniqueWithoutStudentsInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutStudentsInput | CourseUpdateManyWithWhereWithoutStudentsInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type AttendancesUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendancesCreateWithoutStudentInput, AttendancesUncheckedCreateWithoutStudentInput> | AttendancesCreateWithoutStudentInput[] | AttendancesUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutStudentInput | AttendancesCreateOrConnectWithoutStudentInput[]
    upsert?: AttendancesUpsertWithWhereUniqueWithoutStudentInput | AttendancesUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendancesCreateManyStudentInputEnvelope
    set?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    disconnect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    delete?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    update?: AttendancesUpdateWithWhereUniqueWithoutStudentInput | AttendancesUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendancesUpdateManyWithWhereWithoutStudentInput | AttendancesUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
  }

  export type PaymentsUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PaymentsCreateWithoutStudentInput, PaymentsUncheckedCreateWithoutStudentInput> | PaymentsCreateWithoutStudentInput[] | PaymentsUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutStudentInput | PaymentsCreateOrConnectWithoutStudentInput[]
    upsert?: PaymentsUpsertWithWhereUniqueWithoutStudentInput | PaymentsUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PaymentsCreateManyStudentInputEnvelope
    set?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    disconnect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    delete?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    update?: PaymentsUpdateWithWhereUniqueWithoutStudentInput | PaymentsUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PaymentsUpdateManyWithWhereWithoutStudentInput | PaymentsUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
  }

  export type SubjectCreateNestedManyWithoutTeachersInput = {
    create?: XOR<SubjectCreateWithoutTeachersInput, SubjectUncheckedCreateWithoutTeachersInput> | SubjectCreateWithoutTeachersInput[] | SubjectUncheckedCreateWithoutTeachersInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeachersInput | SubjectCreateOrConnectWithoutTeachersInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type CourseCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type GroupsCreateNestedManyWithoutTeacherInput = {
    create?: XOR<GroupsCreateWithoutTeacherInput, GroupsUncheckedCreateWithoutTeacherInput> | GroupsCreateWithoutTeacherInput[] | GroupsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutTeacherInput | GroupsCreateOrConnectWithoutTeacherInput[]
    createMany?: GroupsCreateManyTeacherInputEnvelope
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
  }

  export type AttendancesCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AttendancesCreateWithoutTeacherInput, AttendancesUncheckedCreateWithoutTeacherInput> | AttendancesCreateWithoutTeacherInput[] | AttendancesUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutTeacherInput | AttendancesCreateOrConnectWithoutTeacherInput[]
    createMany?: AttendancesCreateManyTeacherInputEnvelope
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
  }

  export type LessonsCreateNestedManyWithoutTeacherInput = {
    create?: XOR<LessonsCreateWithoutTeacherInput, LessonsUncheckedCreateWithoutTeacherInput> | LessonsCreateWithoutTeacherInput[] | LessonsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutTeacherInput | LessonsCreateOrConnectWithoutTeacherInput[]
    createMany?: LessonsCreateManyTeacherInputEnvelope
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
  }

  export type SubjectUncheckedCreateNestedManyWithoutTeachersInput = {
    create?: XOR<SubjectCreateWithoutTeachersInput, SubjectUncheckedCreateWithoutTeachersInput> | SubjectCreateWithoutTeachersInput[] | SubjectUncheckedCreateWithoutTeachersInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeachersInput | SubjectCreateOrConnectWithoutTeachersInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type GroupsUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<GroupsCreateWithoutTeacherInput, GroupsUncheckedCreateWithoutTeacherInput> | GroupsCreateWithoutTeacherInput[] | GroupsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutTeacherInput | GroupsCreateOrConnectWithoutTeacherInput[]
    createMany?: GroupsCreateManyTeacherInputEnvelope
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
  }

  export type AttendancesUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AttendancesCreateWithoutTeacherInput, AttendancesUncheckedCreateWithoutTeacherInput> | AttendancesCreateWithoutTeacherInput[] | AttendancesUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutTeacherInput | AttendancesCreateOrConnectWithoutTeacherInput[]
    createMany?: AttendancesCreateManyTeacherInputEnvelope
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
  }

  export type LessonsUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<LessonsCreateWithoutTeacherInput, LessonsUncheckedCreateWithoutTeacherInput> | LessonsCreateWithoutTeacherInput[] | LessonsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutTeacherInput | LessonsCreateOrConnectWithoutTeacherInput[]
    createMany?: LessonsCreateManyTeacherInputEnvelope
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubjectUpdateManyWithoutTeachersNestedInput = {
    create?: XOR<SubjectCreateWithoutTeachersInput, SubjectUncheckedCreateWithoutTeachersInput> | SubjectCreateWithoutTeachersInput[] | SubjectUncheckedCreateWithoutTeachersInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeachersInput | SubjectCreateOrConnectWithoutTeachersInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutTeachersInput | SubjectUpsertWithWhereUniqueWithoutTeachersInput[]
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutTeachersInput | SubjectUpdateWithWhereUniqueWithoutTeachersInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutTeachersInput | SubjectUpdateManyWithWhereWithoutTeachersInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type CourseUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type GroupsUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<GroupsCreateWithoutTeacherInput, GroupsUncheckedCreateWithoutTeacherInput> | GroupsCreateWithoutTeacherInput[] | GroupsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutTeacherInput | GroupsCreateOrConnectWithoutTeacherInput[]
    upsert?: GroupsUpsertWithWhereUniqueWithoutTeacherInput | GroupsUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: GroupsCreateManyTeacherInputEnvelope
    set?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    disconnect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    delete?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    update?: GroupsUpdateWithWhereUniqueWithoutTeacherInput | GroupsUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: GroupsUpdateManyWithWhereWithoutTeacherInput | GroupsUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: GroupsScalarWhereInput | GroupsScalarWhereInput[]
  }

  export type AttendancesUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AttendancesCreateWithoutTeacherInput, AttendancesUncheckedCreateWithoutTeacherInput> | AttendancesCreateWithoutTeacherInput[] | AttendancesUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutTeacherInput | AttendancesCreateOrConnectWithoutTeacherInput[]
    upsert?: AttendancesUpsertWithWhereUniqueWithoutTeacherInput | AttendancesUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AttendancesCreateManyTeacherInputEnvelope
    set?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    disconnect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    delete?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    update?: AttendancesUpdateWithWhereUniqueWithoutTeacherInput | AttendancesUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AttendancesUpdateManyWithWhereWithoutTeacherInput | AttendancesUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
  }

  export type LessonsUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<LessonsCreateWithoutTeacherInput, LessonsUncheckedCreateWithoutTeacherInput> | LessonsCreateWithoutTeacherInput[] | LessonsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutTeacherInput | LessonsCreateOrConnectWithoutTeacherInput[]
    upsert?: LessonsUpsertWithWhereUniqueWithoutTeacherInput | LessonsUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: LessonsCreateManyTeacherInputEnvelope
    set?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    disconnect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    delete?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    update?: LessonsUpdateWithWhereUniqueWithoutTeacherInput | LessonsUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: LessonsUpdateManyWithWhereWithoutTeacherInput | LessonsUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: LessonsScalarWhereInput | LessonsScalarWhereInput[]
  }

  export type SubjectUncheckedUpdateManyWithoutTeachersNestedInput = {
    create?: XOR<SubjectCreateWithoutTeachersInput, SubjectUncheckedCreateWithoutTeachersInput> | SubjectCreateWithoutTeachersInput[] | SubjectUncheckedCreateWithoutTeachersInput[]
    connectOrCreate?: SubjectCreateOrConnectWithoutTeachersInput | SubjectCreateOrConnectWithoutTeachersInput[]
    upsert?: SubjectUpsertWithWhereUniqueWithoutTeachersInput | SubjectUpsertWithWhereUniqueWithoutTeachersInput[]
    set?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    disconnect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    delete?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    connect?: SubjectWhereUniqueInput | SubjectWhereUniqueInput[]
    update?: SubjectUpdateWithWhereUniqueWithoutTeachersInput | SubjectUpdateWithWhereUniqueWithoutTeachersInput[]
    updateMany?: SubjectUpdateManyWithWhereWithoutTeachersInput | SubjectUpdateManyWithWhereWithoutTeachersInput[]
    deleteMany?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput> | CourseCreateWithoutTeacherInput[] | CourseUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutTeacherInput | CourseCreateOrConnectWithoutTeacherInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutTeacherInput | CourseUpsertWithWhereUniqueWithoutTeacherInput[]
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutTeacherInput | CourseUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutTeacherInput | CourseUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type GroupsUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<GroupsCreateWithoutTeacherInput, GroupsUncheckedCreateWithoutTeacherInput> | GroupsCreateWithoutTeacherInput[] | GroupsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutTeacherInput | GroupsCreateOrConnectWithoutTeacherInput[]
    upsert?: GroupsUpsertWithWhereUniqueWithoutTeacherInput | GroupsUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: GroupsCreateManyTeacherInputEnvelope
    set?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    disconnect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    delete?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    update?: GroupsUpdateWithWhereUniqueWithoutTeacherInput | GroupsUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: GroupsUpdateManyWithWhereWithoutTeacherInput | GroupsUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: GroupsScalarWhereInput | GroupsScalarWhereInput[]
  }

  export type AttendancesUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AttendancesCreateWithoutTeacherInput, AttendancesUncheckedCreateWithoutTeacherInput> | AttendancesCreateWithoutTeacherInput[] | AttendancesUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutTeacherInput | AttendancesCreateOrConnectWithoutTeacherInput[]
    upsert?: AttendancesUpsertWithWhereUniqueWithoutTeacherInput | AttendancesUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AttendancesCreateManyTeacherInputEnvelope
    set?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    disconnect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    delete?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    update?: AttendancesUpdateWithWhereUniqueWithoutTeacherInput | AttendancesUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AttendancesUpdateManyWithWhereWithoutTeacherInput | AttendancesUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
  }

  export type LessonsUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<LessonsCreateWithoutTeacherInput, LessonsUncheckedCreateWithoutTeacherInput> | LessonsCreateWithoutTeacherInput[] | LessonsUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutTeacherInput | LessonsCreateOrConnectWithoutTeacherInput[]
    upsert?: LessonsUpsertWithWhereUniqueWithoutTeacherInput | LessonsUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: LessonsCreateManyTeacherInputEnvelope
    set?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    disconnect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    delete?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    update?: LessonsUpdateWithWhereUniqueWithoutTeacherInput | LessonsUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: LessonsUpdateManyWithWhereWithoutTeacherInput | LessonsUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: LessonsScalarWhereInput | LessonsScalarWhereInput[]
  }

  export type LessonsCreatedaysOfWeekInput = {
    set: $Enums.DaysOfWeek[]
  }

  export type GroupsCreateNestedOneWithoutLessonsInput = {
    create?: XOR<GroupsCreateWithoutLessonsInput, GroupsUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: GroupsCreateOrConnectWithoutLessonsInput
    connect?: GroupsWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutLessonsInput = {
    create?: XOR<TeacherCreateWithoutLessonsInput, TeacherUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutLessonsInput
    connect?: TeacherWhereUniqueInput
  }

  export type AttendancesCreateNestedManyWithoutLessonsInput = {
    create?: XOR<AttendancesCreateWithoutLessonsInput, AttendancesUncheckedCreateWithoutLessonsInput> | AttendancesCreateWithoutLessonsInput[] | AttendancesUncheckedCreateWithoutLessonsInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutLessonsInput | AttendancesCreateOrConnectWithoutLessonsInput[]
    createMany?: AttendancesCreateManyLessonsInputEnvelope
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
  }

  export type AttendancesUncheckedCreateNestedManyWithoutLessonsInput = {
    create?: XOR<AttendancesCreateWithoutLessonsInput, AttendancesUncheckedCreateWithoutLessonsInput> | AttendancesCreateWithoutLessonsInput[] | AttendancesUncheckedCreateWithoutLessonsInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutLessonsInput | AttendancesCreateOrConnectWithoutLessonsInput[]
    createMany?: AttendancesCreateManyLessonsInputEnvelope
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
  }

  export type LessonsUpdatedaysOfWeekInput = {
    set?: $Enums.DaysOfWeek[]
    push?: $Enums.DaysOfWeek | $Enums.DaysOfWeek[]
  }

  export type GroupsUpdateOneWithoutLessonsNestedInput = {
    create?: XOR<GroupsCreateWithoutLessonsInput, GroupsUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: GroupsCreateOrConnectWithoutLessonsInput
    upsert?: GroupsUpsertWithoutLessonsInput
    disconnect?: GroupsWhereInput | boolean
    delete?: GroupsWhereInput | boolean
    connect?: GroupsWhereUniqueInput
    update?: XOR<XOR<GroupsUpdateToOneWithWhereWithoutLessonsInput, GroupsUpdateWithoutLessonsInput>, GroupsUncheckedUpdateWithoutLessonsInput>
  }

  export type TeacherUpdateOneWithoutLessonsNestedInput = {
    create?: XOR<TeacherCreateWithoutLessonsInput, TeacherUncheckedCreateWithoutLessonsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutLessonsInput
    upsert?: TeacherUpsertWithoutLessonsInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutLessonsInput, TeacherUpdateWithoutLessonsInput>, TeacherUncheckedUpdateWithoutLessonsInput>
  }

  export type AttendancesUpdateManyWithoutLessonsNestedInput = {
    create?: XOR<AttendancesCreateWithoutLessonsInput, AttendancesUncheckedCreateWithoutLessonsInput> | AttendancesCreateWithoutLessonsInput[] | AttendancesUncheckedCreateWithoutLessonsInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutLessonsInput | AttendancesCreateOrConnectWithoutLessonsInput[]
    upsert?: AttendancesUpsertWithWhereUniqueWithoutLessonsInput | AttendancesUpsertWithWhereUniqueWithoutLessonsInput[]
    createMany?: AttendancesCreateManyLessonsInputEnvelope
    set?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    disconnect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    delete?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    update?: AttendancesUpdateWithWhereUniqueWithoutLessonsInput | AttendancesUpdateWithWhereUniqueWithoutLessonsInput[]
    updateMany?: AttendancesUpdateManyWithWhereWithoutLessonsInput | AttendancesUpdateManyWithWhereWithoutLessonsInput[]
    deleteMany?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
  }

  export type AttendancesUncheckedUpdateManyWithoutLessonsNestedInput = {
    create?: XOR<AttendancesCreateWithoutLessonsInput, AttendancesUncheckedCreateWithoutLessonsInput> | AttendancesCreateWithoutLessonsInput[] | AttendancesUncheckedCreateWithoutLessonsInput[]
    connectOrCreate?: AttendancesCreateOrConnectWithoutLessonsInput | AttendancesCreateOrConnectWithoutLessonsInput[]
    upsert?: AttendancesUpsertWithWhereUniqueWithoutLessonsInput | AttendancesUpsertWithWhereUniqueWithoutLessonsInput[]
    createMany?: AttendancesCreateManyLessonsInputEnvelope
    set?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    disconnect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    delete?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    connect?: AttendancesWhereUniqueInput | AttendancesWhereUniqueInput[]
    update?: AttendancesUpdateWithWhereUniqueWithoutLessonsInput | AttendancesUpdateWithWhereUniqueWithoutLessonsInput[]
    updateMany?: AttendancesUpdateManyWithWhereWithoutLessonsInput | AttendancesUpdateManyWithWhereWithoutLessonsInput[]
    deleteMany?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
  }

  export type StudentCreateNestedManyWithoutGroupInput = {
    create?: XOR<StudentCreateWithoutGroupInput, StudentUncheckedCreateWithoutGroupInput> | StudentCreateWithoutGroupInput[] | StudentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutGroupInput | StudentCreateOrConnectWithoutGroupInput[]
    createMany?: StudentCreateManyGroupInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type TeacherCreateNestedOneWithoutGroupInput = {
    create?: XOR<TeacherCreateWithoutGroupInput, TeacherUncheckedCreateWithoutGroupInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutGroupInput
    connect?: TeacherWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutGroupsInput = {
    create?: XOR<CourseCreateWithoutGroupsInput, CourseUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutGroupsInput
    connect?: CourseWhereUniqueInput
  }

  export type PaymentsCreateNestedManyWithoutGroupInput = {
    create?: XOR<PaymentsCreateWithoutGroupInput, PaymentsUncheckedCreateWithoutGroupInput> | PaymentsCreateWithoutGroupInput[] | PaymentsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutGroupInput | PaymentsCreateOrConnectWithoutGroupInput[]
    createMany?: PaymentsCreateManyGroupInputEnvelope
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
  }

  export type LessonsCreateNestedManyWithoutGroupInput = {
    create?: XOR<LessonsCreateWithoutGroupInput, LessonsUncheckedCreateWithoutGroupInput> | LessonsCreateWithoutGroupInput[] | LessonsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutGroupInput | LessonsCreateOrConnectWithoutGroupInput[]
    createMany?: LessonsCreateManyGroupInputEnvelope
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<StudentCreateWithoutGroupInput, StudentUncheckedCreateWithoutGroupInput> | StudentCreateWithoutGroupInput[] | StudentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutGroupInput | StudentCreateOrConnectWithoutGroupInput[]
    createMany?: StudentCreateManyGroupInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type PaymentsUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<PaymentsCreateWithoutGroupInput, PaymentsUncheckedCreateWithoutGroupInput> | PaymentsCreateWithoutGroupInput[] | PaymentsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutGroupInput | PaymentsCreateOrConnectWithoutGroupInput[]
    createMany?: PaymentsCreateManyGroupInputEnvelope
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
  }

  export type LessonsUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<LessonsCreateWithoutGroupInput, LessonsUncheckedCreateWithoutGroupInput> | LessonsCreateWithoutGroupInput[] | LessonsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutGroupInput | LessonsCreateOrConnectWithoutGroupInput[]
    createMany?: LessonsCreateManyGroupInputEnvelope
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
  }

  export type StudentUpdateManyWithoutGroupNestedInput = {
    create?: XOR<StudentCreateWithoutGroupInput, StudentUncheckedCreateWithoutGroupInput> | StudentCreateWithoutGroupInput[] | StudentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutGroupInput | StudentCreateOrConnectWithoutGroupInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutGroupInput | StudentUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: StudentCreateManyGroupInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutGroupInput | StudentUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutGroupInput | StudentUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type TeacherUpdateOneWithoutGroupNestedInput = {
    create?: XOR<TeacherCreateWithoutGroupInput, TeacherUncheckedCreateWithoutGroupInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutGroupInput
    upsert?: TeacherUpsertWithoutGroupInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutGroupInput, TeacherUpdateWithoutGroupInput>, TeacherUncheckedUpdateWithoutGroupInput>
  }

  export type CourseUpdateOneWithoutGroupsNestedInput = {
    create?: XOR<CourseCreateWithoutGroupsInput, CourseUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutGroupsInput
    upsert?: CourseUpsertWithoutGroupsInput
    disconnect?: CourseWhereInput | boolean
    delete?: CourseWhereInput | boolean
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutGroupsInput, CourseUpdateWithoutGroupsInput>, CourseUncheckedUpdateWithoutGroupsInput>
  }

  export type PaymentsUpdateManyWithoutGroupNestedInput = {
    create?: XOR<PaymentsCreateWithoutGroupInput, PaymentsUncheckedCreateWithoutGroupInput> | PaymentsCreateWithoutGroupInput[] | PaymentsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutGroupInput | PaymentsCreateOrConnectWithoutGroupInput[]
    upsert?: PaymentsUpsertWithWhereUniqueWithoutGroupInput | PaymentsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: PaymentsCreateManyGroupInputEnvelope
    set?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    disconnect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    delete?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    update?: PaymentsUpdateWithWhereUniqueWithoutGroupInput | PaymentsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: PaymentsUpdateManyWithWhereWithoutGroupInput | PaymentsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
  }

  export type LessonsUpdateManyWithoutGroupNestedInput = {
    create?: XOR<LessonsCreateWithoutGroupInput, LessonsUncheckedCreateWithoutGroupInput> | LessonsCreateWithoutGroupInput[] | LessonsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutGroupInput | LessonsCreateOrConnectWithoutGroupInput[]
    upsert?: LessonsUpsertWithWhereUniqueWithoutGroupInput | LessonsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: LessonsCreateManyGroupInputEnvelope
    set?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    disconnect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    delete?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    update?: LessonsUpdateWithWhereUniqueWithoutGroupInput | LessonsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: LessonsUpdateManyWithWhereWithoutGroupInput | LessonsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: LessonsScalarWhereInput | LessonsScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<StudentCreateWithoutGroupInput, StudentUncheckedCreateWithoutGroupInput> | StudentCreateWithoutGroupInput[] | StudentUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutGroupInput | StudentCreateOrConnectWithoutGroupInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutGroupInput | StudentUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: StudentCreateManyGroupInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutGroupInput | StudentUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutGroupInput | StudentUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type PaymentsUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<PaymentsCreateWithoutGroupInput, PaymentsUncheckedCreateWithoutGroupInput> | PaymentsCreateWithoutGroupInput[] | PaymentsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: PaymentsCreateOrConnectWithoutGroupInput | PaymentsCreateOrConnectWithoutGroupInput[]
    upsert?: PaymentsUpsertWithWhereUniqueWithoutGroupInput | PaymentsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: PaymentsCreateManyGroupInputEnvelope
    set?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    disconnect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    delete?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    connect?: PaymentsWhereUniqueInput | PaymentsWhereUniqueInput[]
    update?: PaymentsUpdateWithWhereUniqueWithoutGroupInput | PaymentsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: PaymentsUpdateManyWithWhereWithoutGroupInput | PaymentsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
  }

  export type LessonsUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<LessonsCreateWithoutGroupInput, LessonsUncheckedCreateWithoutGroupInput> | LessonsCreateWithoutGroupInput[] | LessonsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LessonsCreateOrConnectWithoutGroupInput | LessonsCreateOrConnectWithoutGroupInput[]
    upsert?: LessonsUpsertWithWhereUniqueWithoutGroupInput | LessonsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: LessonsCreateManyGroupInputEnvelope
    set?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    disconnect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    delete?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    connect?: LessonsWhereUniqueInput | LessonsWhereUniqueInput[]
    update?: LessonsUpdateWithWhereUniqueWithoutGroupInput | LessonsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: LessonsUpdateManyWithWhereWithoutGroupInput | LessonsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: LessonsScalarWhereInput | LessonsScalarWhereInput[]
  }

  export type TeacherCreateNestedManyWithoutSubjectsInput = {
    create?: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput> | TeacherCreateWithoutSubjectsInput[] | TeacherUncheckedCreateWithoutSubjectsInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectsInput | TeacherCreateOrConnectWithoutSubjectsInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
  }

  export type CourseCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CourseCreateWithoutSubjectInput, CourseUncheckedCreateWithoutSubjectInput> | CourseCreateWithoutSubjectInput[] | CourseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubjectInput | CourseCreateOrConnectWithoutSubjectInput[]
    createMany?: CourseCreateManySubjectInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type TeacherUncheckedCreateNestedManyWithoutSubjectsInput = {
    create?: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput> | TeacherCreateWithoutSubjectsInput[] | TeacherUncheckedCreateWithoutSubjectsInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectsInput | TeacherCreateOrConnectWithoutSubjectsInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
  }

  export type CourseUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<CourseCreateWithoutSubjectInput, CourseUncheckedCreateWithoutSubjectInput> | CourseCreateWithoutSubjectInput[] | CourseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubjectInput | CourseCreateOrConnectWithoutSubjectInput[]
    createMany?: CourseCreateManySubjectInputEnvelope
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
  }

  export type TeacherUpdateManyWithoutSubjectsNestedInput = {
    create?: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput> | TeacherCreateWithoutSubjectsInput[] | TeacherUncheckedCreateWithoutSubjectsInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectsInput | TeacherCreateOrConnectWithoutSubjectsInput[]
    upsert?: TeacherUpsertWithWhereUniqueWithoutSubjectsInput | TeacherUpsertWithWhereUniqueWithoutSubjectsInput[]
    set?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    disconnect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    delete?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    update?: TeacherUpdateWithWhereUniqueWithoutSubjectsInput | TeacherUpdateWithWhereUniqueWithoutSubjectsInput[]
    updateMany?: TeacherUpdateManyWithWhereWithoutSubjectsInput | TeacherUpdateManyWithWhereWithoutSubjectsInput[]
    deleteMany?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
  }

  export type CourseUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CourseCreateWithoutSubjectInput, CourseUncheckedCreateWithoutSubjectInput> | CourseCreateWithoutSubjectInput[] | CourseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubjectInput | CourseCreateOrConnectWithoutSubjectInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSubjectInput | CourseUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CourseCreateManySubjectInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSubjectInput | CourseUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSubjectInput | CourseUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type TeacherUncheckedUpdateManyWithoutSubjectsNestedInput = {
    create?: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput> | TeacherCreateWithoutSubjectsInput[] | TeacherUncheckedCreateWithoutSubjectsInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutSubjectsInput | TeacherCreateOrConnectWithoutSubjectsInput[]
    upsert?: TeacherUpsertWithWhereUniqueWithoutSubjectsInput | TeacherUpsertWithWhereUniqueWithoutSubjectsInput[]
    set?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    disconnect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    delete?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    update?: TeacherUpdateWithWhereUniqueWithoutSubjectsInput | TeacherUpdateWithWhereUniqueWithoutSubjectsInput[]
    updateMany?: TeacherUpdateManyWithWhereWithoutSubjectsInput | TeacherUpdateManyWithWhereWithoutSubjectsInput[]
    deleteMany?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
  }

  export type CourseUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<CourseCreateWithoutSubjectInput, CourseUncheckedCreateWithoutSubjectInput> | CourseCreateWithoutSubjectInput[] | CourseUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: CourseCreateOrConnectWithoutSubjectInput | CourseCreateOrConnectWithoutSubjectInput[]
    upsert?: CourseUpsertWithWhereUniqueWithoutSubjectInput | CourseUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: CourseCreateManySubjectInputEnvelope
    set?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    disconnect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    delete?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    connect?: CourseWhereUniqueInput | CourseWhereUniqueInput[]
    update?: CourseUpdateWithWhereUniqueWithoutSubjectInput | CourseUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: CourseUpdateManyWithWhereWithoutSubjectInput | CourseUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: CourseScalarWhereInput | CourseScalarWhereInput[]
  }

  export type SubjectCreateNestedOneWithoutCoursesInput = {
    create?: XOR<SubjectCreateWithoutCoursesInput, SubjectUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCoursesInput
    connect?: SubjectWhereUniqueInput
  }

  export type TeacherCreateNestedManyWithoutCoursesInput = {
    create?: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput> | TeacherCreateWithoutCoursesInput[] | TeacherUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutCoursesInput | TeacherCreateOrConnectWithoutCoursesInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
  }

  export type StudentCreateNestedManyWithoutCoursesInput = {
    create?: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput> | StudentCreateWithoutCoursesInput[] | StudentUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesInput | StudentCreateOrConnectWithoutCoursesInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type GroupsCreateNestedManyWithoutCourseInput = {
    create?: XOR<GroupsCreateWithoutCourseInput, GroupsUncheckedCreateWithoutCourseInput> | GroupsCreateWithoutCourseInput[] | GroupsUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutCourseInput | GroupsCreateOrConnectWithoutCourseInput[]
    createMany?: GroupsCreateManyCourseInputEnvelope
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
  }

  export type TeacherUncheckedCreateNestedManyWithoutCoursesInput = {
    create?: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput> | TeacherCreateWithoutCoursesInput[] | TeacherUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutCoursesInput | TeacherCreateOrConnectWithoutCoursesInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutCoursesInput = {
    create?: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput> | StudentCreateWithoutCoursesInput[] | StudentUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesInput | StudentCreateOrConnectWithoutCoursesInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type GroupsUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<GroupsCreateWithoutCourseInput, GroupsUncheckedCreateWithoutCourseInput> | GroupsCreateWithoutCourseInput[] | GroupsUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutCourseInput | GroupsCreateOrConnectWithoutCourseInput[]
    createMany?: GroupsCreateManyCourseInputEnvelope
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
  }

  export type SubjectUpdateOneWithoutCoursesNestedInput = {
    create?: XOR<SubjectCreateWithoutCoursesInput, SubjectUncheckedCreateWithoutCoursesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutCoursesInput
    upsert?: SubjectUpsertWithoutCoursesInput
    disconnect?: SubjectWhereInput | boolean
    delete?: SubjectWhereInput | boolean
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutCoursesInput, SubjectUpdateWithoutCoursesInput>, SubjectUncheckedUpdateWithoutCoursesInput>
  }

  export type TeacherUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput> | TeacherCreateWithoutCoursesInput[] | TeacherUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutCoursesInput | TeacherCreateOrConnectWithoutCoursesInput[]
    upsert?: TeacherUpsertWithWhereUniqueWithoutCoursesInput | TeacherUpsertWithWhereUniqueWithoutCoursesInput[]
    set?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    disconnect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    delete?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    update?: TeacherUpdateWithWhereUniqueWithoutCoursesInput | TeacherUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: TeacherUpdateManyWithWhereWithoutCoursesInput | TeacherUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
  }

  export type StudentUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput> | StudentCreateWithoutCoursesInput[] | StudentUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesInput | StudentCreateOrConnectWithoutCoursesInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCoursesInput | StudentUpsertWithWhereUniqueWithoutCoursesInput[]
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCoursesInput | StudentUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCoursesInput | StudentUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type GroupsUpdateManyWithoutCourseNestedInput = {
    create?: XOR<GroupsCreateWithoutCourseInput, GroupsUncheckedCreateWithoutCourseInput> | GroupsCreateWithoutCourseInput[] | GroupsUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutCourseInput | GroupsCreateOrConnectWithoutCourseInput[]
    upsert?: GroupsUpsertWithWhereUniqueWithoutCourseInput | GroupsUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: GroupsCreateManyCourseInputEnvelope
    set?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    disconnect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    delete?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    update?: GroupsUpdateWithWhereUniqueWithoutCourseInput | GroupsUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: GroupsUpdateManyWithWhereWithoutCourseInput | GroupsUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: GroupsScalarWhereInput | GroupsScalarWhereInput[]
  }

  export type TeacherUncheckedUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput> | TeacherCreateWithoutCoursesInput[] | TeacherUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: TeacherCreateOrConnectWithoutCoursesInput | TeacherCreateOrConnectWithoutCoursesInput[]
    upsert?: TeacherUpsertWithWhereUniqueWithoutCoursesInput | TeacherUpsertWithWhereUniqueWithoutCoursesInput[]
    set?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    disconnect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    delete?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    connect?: TeacherWhereUniqueInput | TeacherWhereUniqueInput[]
    update?: TeacherUpdateWithWhereUniqueWithoutCoursesInput | TeacherUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: TeacherUpdateManyWithWhereWithoutCoursesInput | TeacherUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutCoursesNestedInput = {
    create?: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput> | StudentCreateWithoutCoursesInput[] | StudentUncheckedCreateWithoutCoursesInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesInput | StudentCreateOrConnectWithoutCoursesInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCoursesInput | StudentUpsertWithWhereUniqueWithoutCoursesInput[]
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCoursesInput | StudentUpdateWithWhereUniqueWithoutCoursesInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCoursesInput | StudentUpdateManyWithWhereWithoutCoursesInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type GroupsUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<GroupsCreateWithoutCourseInput, GroupsUncheckedCreateWithoutCourseInput> | GroupsCreateWithoutCourseInput[] | GroupsUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: GroupsCreateOrConnectWithoutCourseInput | GroupsCreateOrConnectWithoutCourseInput[]
    upsert?: GroupsUpsertWithWhereUniqueWithoutCourseInput | GroupsUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: GroupsCreateManyCourseInputEnvelope
    set?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    disconnect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    delete?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    connect?: GroupsWhereUniqueInput | GroupsWhereUniqueInput[]
    update?: GroupsUpdateWithWhereUniqueWithoutCourseInput | GroupsUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: GroupsUpdateManyWithWhereWithoutCourseInput | GroupsUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: GroupsScalarWhereInput | GroupsScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendancesInput
    connect?: StudentWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<TeacherCreateWithoutAttendancesInput, TeacherUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAttendancesInput
    connect?: TeacherWhereUniqueInput
  }

  export type LessonsCreateNestedOneWithoutAttendanceInput = {
    create?: XOR<LessonsCreateWithoutAttendanceInput, LessonsUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: LessonsCreateOrConnectWithoutAttendanceInput
    connect?: LessonsWhereUniqueInput
  }

  export type StudentUpdateOneWithoutAttendancesNestedInput = {
    create?: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendancesInput
    upsert?: StudentUpsertWithoutAttendancesInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAttendancesInput, StudentUpdateWithoutAttendancesInput>, StudentUncheckedUpdateWithoutAttendancesInput>
  }

  export type TeacherUpdateOneWithoutAttendancesNestedInput = {
    create?: XOR<TeacherCreateWithoutAttendancesInput, TeacherUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAttendancesInput
    upsert?: TeacherUpsertWithoutAttendancesInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutAttendancesInput, TeacherUpdateWithoutAttendancesInput>, TeacherUncheckedUpdateWithoutAttendancesInput>
  }

  export type LessonsUpdateOneWithoutAttendanceNestedInput = {
    create?: XOR<LessonsCreateWithoutAttendanceInput, LessonsUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: LessonsCreateOrConnectWithoutAttendanceInput
    upsert?: LessonsUpsertWithoutAttendanceInput
    disconnect?: LessonsWhereInput | boolean
    delete?: LessonsWhereInput | boolean
    connect?: LessonsWhereUniqueInput
    update?: XOR<XOR<LessonsUpdateToOneWithWhereWithoutAttendanceInput, LessonsUpdateWithoutAttendanceInput>, LessonsUncheckedUpdateWithoutAttendanceInput>
  }

  export type GroupsCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<GroupsCreateWithoutPaymentsInput, GroupsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: GroupsCreateOrConnectWithoutPaymentsInput
    connect?: GroupsWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPaymentsInput
    connect?: StudentWhereUniqueInput
  }

  export type GroupsUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<GroupsCreateWithoutPaymentsInput, GroupsUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: GroupsCreateOrConnectWithoutPaymentsInput
    upsert?: GroupsUpsertWithoutPaymentsInput
    disconnect?: GroupsWhereInput | boolean
    delete?: GroupsWhereInput | boolean
    connect?: GroupsWhereUniqueInput
    update?: XOR<XOR<GroupsUpdateToOneWithWhereWithoutPaymentsInput, GroupsUpdateWithoutPaymentsInput>, GroupsUncheckedUpdateWithoutPaymentsInput>
  }

  export type StudentUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPaymentsInput
    upsert?: StudentUpsertWithoutPaymentsInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPaymentsInput, StudentUpdateWithoutPaymentsInput>, StudentUncheckedUpdateWithoutPaymentsInput>
  }

  export type StudentCreateNestedManyWithoutCameFromInput = {
    create?: XOR<StudentCreateWithoutCameFromInput, StudentUncheckedCreateWithoutCameFromInput> | StudentCreateWithoutCameFromInput[] | StudentUncheckedCreateWithoutCameFromInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCameFromInput | StudentCreateOrConnectWithoutCameFromInput[]
    createMany?: StudentCreateManyCameFromInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutCameFromInput = {
    create?: XOR<StudentCreateWithoutCameFromInput, StudentUncheckedCreateWithoutCameFromInput> | StudentCreateWithoutCameFromInput[] | StudentUncheckedCreateWithoutCameFromInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCameFromInput | StudentCreateOrConnectWithoutCameFromInput[]
    createMany?: StudentCreateManyCameFromInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type StudentUpdateManyWithoutCameFromNestedInput = {
    create?: XOR<StudentCreateWithoutCameFromInput, StudentUncheckedCreateWithoutCameFromInput> | StudentCreateWithoutCameFromInput[] | StudentUncheckedCreateWithoutCameFromInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCameFromInput | StudentCreateOrConnectWithoutCameFromInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCameFromInput | StudentUpsertWithWhereUniqueWithoutCameFromInput[]
    createMany?: StudentCreateManyCameFromInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCameFromInput | StudentUpdateWithWhereUniqueWithoutCameFromInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCameFromInput | StudentUpdateManyWithWhereWithoutCameFromInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutCameFromNestedInput = {
    create?: XOR<StudentCreateWithoutCameFromInput, StudentUncheckedCreateWithoutCameFromInput> | StudentCreateWithoutCameFromInput[] | StudentUncheckedCreateWithoutCameFromInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCameFromInput | StudentCreateOrConnectWithoutCameFromInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCameFromInput | StudentUpsertWithWhereUniqueWithoutCameFromInput[]
    createMany?: StudentCreateManyCameFromInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCameFromInput | StudentUpdateWithWhereUniqueWithoutCameFromInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCameFromInput | StudentUpdateManyWithWhereWithoutCameFromInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
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
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type CourseCreateWithoutStudentsInput = {
    id?: string
    name: string
    desc: string
    price: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subject?: SubjectCreateNestedOneWithoutCoursesInput
    teacher?: TeacherCreateNestedManyWithoutCoursesInput
    groups?: GroupsCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutStudentsInput = {
    id?: string
    name: string
    desc: string
    price: string
    subjectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherUncheckedCreateNestedManyWithoutCoursesInput
    groups?: GroupsUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutStudentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>
  }

  export type cameFromCreateWithoutStudentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type cameFromUncheckedCreateWithoutStudentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type cameFromCreateOrConnectWithoutStudentsInput = {
    where: cameFromWhereUniqueInput
    create: XOR<cameFromCreateWithoutStudentsInput, cameFromUncheckedCreateWithoutStudentsInput>
  }

  export type GroupsCreateWithoutStudentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherCreateNestedOneWithoutGroupInput
    course?: CourseCreateNestedOneWithoutGroupsInput
    payments?: PaymentsCreateNestedManyWithoutGroupInput
    lessons?: LessonsCreateNestedManyWithoutGroupInput
  }

  export type GroupsUncheckedCreateWithoutStudentsInput = {
    id?: string
    name: string
    courseId?: string | null
    teacherId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentsUncheckedCreateNestedManyWithoutGroupInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupsCreateOrConnectWithoutStudentsInput = {
    where: GroupsWhereUniqueInput
    create: XOR<GroupsCreateWithoutStudentsInput, GroupsUncheckedCreateWithoutStudentsInput>
  }

  export type AttendancesCreateWithoutStudentInput = {
    id?: string
    desc: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherCreateNestedOneWithoutAttendancesInput
    lessons?: LessonsCreateNestedOneWithoutAttendanceInput
  }

  export type AttendancesUncheckedCreateWithoutStudentInput = {
    id?: string
    desc: string
    teacherId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonsId?: string | null
  }

  export type AttendancesCreateOrConnectWithoutStudentInput = {
    where: AttendancesWhereUniqueInput
    create: XOR<AttendancesCreateWithoutStudentInput, AttendancesUncheckedCreateWithoutStudentInput>
  }

  export type AttendancesCreateManyStudentInputEnvelope = {
    data: AttendancesCreateManyStudentInput | AttendancesCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type PaymentsCreateWithoutStudentInput = {
    id?: string
    date: Date | string
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupsCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentsUncheckedCreateWithoutStudentInput = {
    id?: string
    date: Date | string
    groupId?: string | null
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentsCreateOrConnectWithoutStudentInput = {
    where: PaymentsWhereUniqueInput
    create: XOR<PaymentsCreateWithoutStudentInput, PaymentsUncheckedCreateWithoutStudentInput>
  }

  export type PaymentsCreateManyStudentInputEnvelope = {
    data: PaymentsCreateManyStudentInput | PaymentsCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type CourseUpsertWithWhereUniqueWithoutStudentsInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutStudentsInput, CourseUncheckedUpdateWithoutStudentsInput>
    create: XOR<CourseCreateWithoutStudentsInput, CourseUncheckedCreateWithoutStudentsInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutStudentsInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutStudentsInput, CourseUncheckedUpdateWithoutStudentsInput>
  }

  export type CourseUpdateManyWithWhereWithoutStudentsInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutStudentsInput>
  }

  export type CourseScalarWhereInput = {
    AND?: CourseScalarWhereInput | CourseScalarWhereInput[]
    OR?: CourseScalarWhereInput[]
    NOT?: CourseScalarWhereInput | CourseScalarWhereInput[]
    id?: StringFilter<"Course"> | string
    name?: StringFilter<"Course"> | string
    desc?: StringFilter<"Course"> | string
    price?: StringFilter<"Course"> | string
    subjectId?: StringNullableFilter<"Course"> | string | null
    createdAt?: DateTimeFilter<"Course"> | Date | string
    updatedAt?: DateTimeFilter<"Course"> | Date | string
  }

  export type cameFromUpsertWithoutStudentsInput = {
    update: XOR<cameFromUpdateWithoutStudentsInput, cameFromUncheckedUpdateWithoutStudentsInput>
    create: XOR<cameFromCreateWithoutStudentsInput, cameFromUncheckedCreateWithoutStudentsInput>
    where?: cameFromWhereInput
  }

  export type cameFromUpdateToOneWithWhereWithoutStudentsInput = {
    where?: cameFromWhereInput
    data: XOR<cameFromUpdateWithoutStudentsInput, cameFromUncheckedUpdateWithoutStudentsInput>
  }

  export type cameFromUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cameFromUncheckedUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupsUpsertWithoutStudentsInput = {
    update: XOR<GroupsUpdateWithoutStudentsInput, GroupsUncheckedUpdateWithoutStudentsInput>
    create: XOR<GroupsCreateWithoutStudentsInput, GroupsUncheckedCreateWithoutStudentsInput>
    where?: GroupsWhereInput
  }

  export type GroupsUpdateToOneWithWhereWithoutStudentsInput = {
    where?: GroupsWhereInput
    data: XOR<GroupsUpdateWithoutStudentsInput, GroupsUncheckedUpdateWithoutStudentsInput>
  }

  export type GroupsUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneWithoutGroupNestedInput
    course?: CourseUpdateOneWithoutGroupsNestedInput
    payments?: PaymentsUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentsUncheckedUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type AttendancesUpsertWithWhereUniqueWithoutStudentInput = {
    where: AttendancesWhereUniqueInput
    update: XOR<AttendancesUpdateWithoutStudentInput, AttendancesUncheckedUpdateWithoutStudentInput>
    create: XOR<AttendancesCreateWithoutStudentInput, AttendancesUncheckedCreateWithoutStudentInput>
  }

  export type AttendancesUpdateWithWhereUniqueWithoutStudentInput = {
    where: AttendancesWhereUniqueInput
    data: XOR<AttendancesUpdateWithoutStudentInput, AttendancesUncheckedUpdateWithoutStudentInput>
  }

  export type AttendancesUpdateManyWithWhereWithoutStudentInput = {
    where: AttendancesScalarWhereInput
    data: XOR<AttendancesUpdateManyMutationInput, AttendancesUncheckedUpdateManyWithoutStudentInput>
  }

  export type AttendancesScalarWhereInput = {
    AND?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
    OR?: AttendancesScalarWhereInput[]
    NOT?: AttendancesScalarWhereInput | AttendancesScalarWhereInput[]
    id?: StringFilter<"Attendances"> | string
    desc?: StringFilter<"Attendances"> | string
    studentId?: StringNullableFilter<"Attendances"> | string | null
    teacherId?: StringNullableFilter<"Attendances"> | string | null
    date?: DateTimeFilter<"Attendances"> | Date | string
    createdAt?: DateTimeFilter<"Attendances"> | Date | string
    updatedAt?: DateTimeFilter<"Attendances"> | Date | string
    lessonsId?: StringNullableFilter<"Attendances"> | string | null
  }

  export type PaymentsUpsertWithWhereUniqueWithoutStudentInput = {
    where: PaymentsWhereUniqueInput
    update: XOR<PaymentsUpdateWithoutStudentInput, PaymentsUncheckedUpdateWithoutStudentInput>
    create: XOR<PaymentsCreateWithoutStudentInput, PaymentsUncheckedCreateWithoutStudentInput>
  }

  export type PaymentsUpdateWithWhereUniqueWithoutStudentInput = {
    where: PaymentsWhereUniqueInput
    data: XOR<PaymentsUpdateWithoutStudentInput, PaymentsUncheckedUpdateWithoutStudentInput>
  }

  export type PaymentsUpdateManyWithWhereWithoutStudentInput = {
    where: PaymentsScalarWhereInput
    data: XOR<PaymentsUpdateManyMutationInput, PaymentsUncheckedUpdateManyWithoutStudentInput>
  }

  export type PaymentsScalarWhereInput = {
    AND?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
    OR?: PaymentsScalarWhereInput[]
    NOT?: PaymentsScalarWhereInput | PaymentsScalarWhereInput[]
    id?: StringFilter<"Payments"> | string
    date?: DateTimeFilter<"Payments"> | Date | string
    groupId?: StringNullableFilter<"Payments"> | string | null
    desc?: StringFilter<"Payments"> | string
    amount?: StringFilter<"Payments"> | string
    createdAt?: DateTimeFilter<"Payments"> | Date | string
    updatedAt?: DateTimeFilter<"Payments"> | Date | string
    studentId?: StringNullableFilter<"Payments"> | string | null
  }

  export type SubjectCreateWithoutTeachersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutTeachersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutTeachersInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutTeachersInput, SubjectUncheckedCreateWithoutTeachersInput>
  }

  export type CourseCreateWithoutTeacherInput = {
    id?: string
    name: string
    desc: string
    price: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subject?: SubjectCreateNestedOneWithoutCoursesInput
    students?: StudentCreateNestedManyWithoutCoursesInput
    groups?: GroupsCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutTeacherInput = {
    id?: string
    name: string
    desc: string
    price: string
    subjectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutCoursesInput
    groups?: GroupsUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type GroupsCreateWithoutTeacherInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutGroupInput
    course?: CourseCreateNestedOneWithoutGroupsInput
    payments?: PaymentsCreateNestedManyWithoutGroupInput
    lessons?: LessonsCreateNestedManyWithoutGroupInput
  }

  export type GroupsUncheckedCreateWithoutTeacherInput = {
    id?: string
    name: string
    courseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutGroupInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutGroupInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupsCreateOrConnectWithoutTeacherInput = {
    where: GroupsWhereUniqueInput
    create: XOR<GroupsCreateWithoutTeacherInput, GroupsUncheckedCreateWithoutTeacherInput>
  }

  export type GroupsCreateManyTeacherInputEnvelope = {
    data: GroupsCreateManyTeacherInput | GroupsCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type AttendancesCreateWithoutTeacherInput = {
    id?: string
    desc: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentCreateNestedOneWithoutAttendancesInput
    lessons?: LessonsCreateNestedOneWithoutAttendanceInput
  }

  export type AttendancesUncheckedCreateWithoutTeacherInput = {
    id?: string
    desc: string
    studentId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonsId?: string | null
  }

  export type AttendancesCreateOrConnectWithoutTeacherInput = {
    where: AttendancesWhereUniqueInput
    create: XOR<AttendancesCreateWithoutTeacherInput, AttendancesUncheckedCreateWithoutTeacherInput>
  }

  export type AttendancesCreateManyTeacherInputEnvelope = {
    data: AttendancesCreateManyTeacherInput | AttendancesCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type LessonsCreateWithoutTeacherInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupsCreateNestedOneWithoutLessonsInput
    attendance?: AttendancesCreateNestedManyWithoutLessonsInput
  }

  export type LessonsUncheckedCreateWithoutTeacherInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: string | null
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendancesUncheckedCreateNestedManyWithoutLessonsInput
  }

  export type LessonsCreateOrConnectWithoutTeacherInput = {
    where: LessonsWhereUniqueInput
    create: XOR<LessonsCreateWithoutTeacherInput, LessonsUncheckedCreateWithoutTeacherInput>
  }

  export type LessonsCreateManyTeacherInputEnvelope = {
    data: LessonsCreateManyTeacherInput | LessonsCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type SubjectUpsertWithWhereUniqueWithoutTeachersInput = {
    where: SubjectWhereUniqueInput
    update: XOR<SubjectUpdateWithoutTeachersInput, SubjectUncheckedUpdateWithoutTeachersInput>
    create: XOR<SubjectCreateWithoutTeachersInput, SubjectUncheckedCreateWithoutTeachersInput>
  }

  export type SubjectUpdateWithWhereUniqueWithoutTeachersInput = {
    where: SubjectWhereUniqueInput
    data: XOR<SubjectUpdateWithoutTeachersInput, SubjectUncheckedUpdateWithoutTeachersInput>
  }

  export type SubjectUpdateManyWithWhereWithoutTeachersInput = {
    where: SubjectScalarWhereInput
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyWithoutTeachersInput>
  }

  export type SubjectScalarWhereInput = {
    AND?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    OR?: SubjectScalarWhereInput[]
    NOT?: SubjectScalarWhereInput | SubjectScalarWhereInput[]
    id?: StringFilter<"Subject"> | string
    name?: StringFilter<"Subject"> | string
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
  }

  export type CourseUpsertWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
    create: XOR<CourseCreateWithoutTeacherInput, CourseUncheckedCreateWithoutTeacherInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutTeacherInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutTeacherInput, CourseUncheckedUpdateWithoutTeacherInput>
  }

  export type CourseUpdateManyWithWhereWithoutTeacherInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutTeacherInput>
  }

  export type GroupsUpsertWithWhereUniqueWithoutTeacherInput = {
    where: GroupsWhereUniqueInput
    update: XOR<GroupsUpdateWithoutTeacherInput, GroupsUncheckedUpdateWithoutTeacherInput>
    create: XOR<GroupsCreateWithoutTeacherInput, GroupsUncheckedCreateWithoutTeacherInput>
  }

  export type GroupsUpdateWithWhereUniqueWithoutTeacherInput = {
    where: GroupsWhereUniqueInput
    data: XOR<GroupsUpdateWithoutTeacherInput, GroupsUncheckedUpdateWithoutTeacherInput>
  }

  export type GroupsUpdateManyWithWhereWithoutTeacherInput = {
    where: GroupsScalarWhereInput
    data: XOR<GroupsUpdateManyMutationInput, GroupsUncheckedUpdateManyWithoutTeacherInput>
  }

  export type GroupsScalarWhereInput = {
    AND?: GroupsScalarWhereInput | GroupsScalarWhereInput[]
    OR?: GroupsScalarWhereInput[]
    NOT?: GroupsScalarWhereInput | GroupsScalarWhereInput[]
    id?: StringFilter<"Groups"> | string
    name?: StringFilter<"Groups"> | string
    courseId?: StringNullableFilter<"Groups"> | string | null
    teacherId?: StringNullableFilter<"Groups"> | string | null
    createdAt?: DateTimeFilter<"Groups"> | Date | string
    updatedAt?: DateTimeFilter<"Groups"> | Date | string
  }

  export type AttendancesUpsertWithWhereUniqueWithoutTeacherInput = {
    where: AttendancesWhereUniqueInput
    update: XOR<AttendancesUpdateWithoutTeacherInput, AttendancesUncheckedUpdateWithoutTeacherInput>
    create: XOR<AttendancesCreateWithoutTeacherInput, AttendancesUncheckedCreateWithoutTeacherInput>
  }

  export type AttendancesUpdateWithWhereUniqueWithoutTeacherInput = {
    where: AttendancesWhereUniqueInput
    data: XOR<AttendancesUpdateWithoutTeacherInput, AttendancesUncheckedUpdateWithoutTeacherInput>
  }

  export type AttendancesUpdateManyWithWhereWithoutTeacherInput = {
    where: AttendancesScalarWhereInput
    data: XOR<AttendancesUpdateManyMutationInput, AttendancesUncheckedUpdateManyWithoutTeacherInput>
  }

  export type LessonsUpsertWithWhereUniqueWithoutTeacherInput = {
    where: LessonsWhereUniqueInput
    update: XOR<LessonsUpdateWithoutTeacherInput, LessonsUncheckedUpdateWithoutTeacherInput>
    create: XOR<LessonsCreateWithoutTeacherInput, LessonsUncheckedCreateWithoutTeacherInput>
  }

  export type LessonsUpdateWithWhereUniqueWithoutTeacherInput = {
    where: LessonsWhereUniqueInput
    data: XOR<LessonsUpdateWithoutTeacherInput, LessonsUncheckedUpdateWithoutTeacherInput>
  }

  export type LessonsUpdateManyWithWhereWithoutTeacherInput = {
    where: LessonsScalarWhereInput
    data: XOR<LessonsUpdateManyMutationInput, LessonsUncheckedUpdateManyWithoutTeacherInput>
  }

  export type LessonsScalarWhereInput = {
    AND?: LessonsScalarWhereInput | LessonsScalarWhereInput[]
    OR?: LessonsScalarWhereInput[]
    NOT?: LessonsScalarWhereInput | LessonsScalarWhereInput[]
    id?: StringFilter<"Lessons"> | string
    desc?: StringFilter<"Lessons"> | string
    daysOfWeek?: EnumDaysOfWeekNullableListFilter<"Lessons">
    groupId?: StringNullableFilter<"Lessons"> | string | null
    teacherId?: StringNullableFilter<"Lessons"> | string | null
    startTime?: DateTimeFilter<"Lessons"> | Date | string
    endTime?: DateTimeFilter<"Lessons"> | Date | string
    room?: StringFilter<"Lessons"> | string
    createdAt?: DateTimeFilter<"Lessons"> | Date | string
    updatedAt?: DateTimeFilter<"Lessons"> | Date | string
  }

  export type GroupsCreateWithoutLessonsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutGroupInput
    teacher?: TeacherCreateNestedOneWithoutGroupInput
    course?: CourseCreateNestedOneWithoutGroupsInput
    payments?: PaymentsCreateNestedManyWithoutGroupInput
  }

  export type GroupsUncheckedCreateWithoutLessonsInput = {
    id?: string
    name: string
    courseId?: string | null
    teacherId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutGroupInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupsCreateOrConnectWithoutLessonsInput = {
    where: GroupsWhereUniqueInput
    create: XOR<GroupsCreateWithoutLessonsInput, GroupsUncheckedCreateWithoutLessonsInput>
  }

  export type TeacherCreateWithoutLessonsInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutTeachersInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
    group?: GroupsCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutLessonsInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutTeachersInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    group?: GroupsUncheckedCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutLessonsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutLessonsInput, TeacherUncheckedCreateWithoutLessonsInput>
  }

  export type AttendancesCreateWithoutLessonsInput = {
    id?: string
    desc: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentCreateNestedOneWithoutAttendancesInput
    teacher?: TeacherCreateNestedOneWithoutAttendancesInput
  }

  export type AttendancesUncheckedCreateWithoutLessonsInput = {
    id?: string
    desc: string
    studentId?: string | null
    teacherId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendancesCreateOrConnectWithoutLessonsInput = {
    where: AttendancesWhereUniqueInput
    create: XOR<AttendancesCreateWithoutLessonsInput, AttendancesUncheckedCreateWithoutLessonsInput>
  }

  export type AttendancesCreateManyLessonsInputEnvelope = {
    data: AttendancesCreateManyLessonsInput | AttendancesCreateManyLessonsInput[]
    skipDuplicates?: boolean
  }

  export type GroupsUpsertWithoutLessonsInput = {
    update: XOR<GroupsUpdateWithoutLessonsInput, GroupsUncheckedUpdateWithoutLessonsInput>
    create: XOR<GroupsCreateWithoutLessonsInput, GroupsUncheckedCreateWithoutLessonsInput>
    where?: GroupsWhereInput
  }

  export type GroupsUpdateToOneWithWhereWithoutLessonsInput = {
    where?: GroupsWhereInput
    data: XOR<GroupsUpdateWithoutLessonsInput, GroupsUncheckedUpdateWithoutLessonsInput>
  }

  export type GroupsUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutGroupNestedInput
    teacher?: TeacherUpdateOneWithoutGroupNestedInput
    course?: CourseUpdateOneWithoutGroupsNestedInput
    payments?: PaymentsUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutGroupNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type TeacherUpsertWithoutLessonsInput = {
    update: XOR<TeacherUpdateWithoutLessonsInput, TeacherUncheckedUpdateWithoutLessonsInput>
    create: XOR<TeacherCreateWithoutLessonsInput, TeacherUncheckedCreateWithoutLessonsInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutLessonsInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutLessonsInput, TeacherUncheckedUpdateWithoutLessonsInput>
  }

  export type TeacherUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutTeachersNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    group?: GroupsUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutTeachersNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    group?: GroupsUncheckedUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type AttendancesUpsertWithWhereUniqueWithoutLessonsInput = {
    where: AttendancesWhereUniqueInput
    update: XOR<AttendancesUpdateWithoutLessonsInput, AttendancesUncheckedUpdateWithoutLessonsInput>
    create: XOR<AttendancesCreateWithoutLessonsInput, AttendancesUncheckedCreateWithoutLessonsInput>
  }

  export type AttendancesUpdateWithWhereUniqueWithoutLessonsInput = {
    where: AttendancesWhereUniqueInput
    data: XOR<AttendancesUpdateWithoutLessonsInput, AttendancesUncheckedUpdateWithoutLessonsInput>
  }

  export type AttendancesUpdateManyWithWhereWithoutLessonsInput = {
    where: AttendancesScalarWhereInput
    data: XOR<AttendancesUpdateManyMutationInput, AttendancesUncheckedUpdateManyWithoutLessonsInput>
  }

  export type StudentCreateWithoutGroupInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutStudentsInput
    cameFrom?: cameFromCreateNestedOneWithoutStudentsInput
    attendances?: AttendancesCreateNestedManyWithoutStudentInput
    payments?: PaymentsCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutGroupInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    cameText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutStudentsInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutGroupInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutGroupInput, StudentUncheckedCreateWithoutGroupInput>
  }

  export type StudentCreateManyGroupInputEnvelope = {
    data: StudentCreateManyGroupInput | StudentCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type TeacherCreateWithoutGroupInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutTeachersInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesCreateNestedManyWithoutTeacherInput
    lessons?: LessonsCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutGroupInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutTeachersInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutTeacherInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutGroupInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutGroupInput, TeacherUncheckedCreateWithoutGroupInput>
  }

  export type CourseCreateWithoutGroupsInput = {
    id?: string
    name: string
    desc: string
    price: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subject?: SubjectCreateNestedOneWithoutCoursesInput
    teacher?: TeacherCreateNestedManyWithoutCoursesInput
    students?: StudentCreateNestedManyWithoutCoursesInput
  }

  export type CourseUncheckedCreateWithoutGroupsInput = {
    id?: string
    name: string
    desc: string
    price: string
    subjectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherUncheckedCreateNestedManyWithoutCoursesInput
    students?: StudentUncheckedCreateNestedManyWithoutCoursesInput
  }

  export type CourseCreateOrConnectWithoutGroupsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutGroupsInput, CourseUncheckedCreateWithoutGroupsInput>
  }

  export type PaymentsCreateWithoutGroupInput = {
    id?: string
    date: Date | string
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
    student?: StudentCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentsUncheckedCreateWithoutGroupInput = {
    id?: string
    date: Date | string
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId?: string | null
  }

  export type PaymentsCreateOrConnectWithoutGroupInput = {
    where: PaymentsWhereUniqueInput
    create: XOR<PaymentsCreateWithoutGroupInput, PaymentsUncheckedCreateWithoutGroupInput>
  }

  export type PaymentsCreateManyGroupInputEnvelope = {
    data: PaymentsCreateManyGroupInput | PaymentsCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type LessonsCreateWithoutGroupInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherCreateNestedOneWithoutLessonsInput
    attendance?: AttendancesCreateNestedManyWithoutLessonsInput
  }

  export type LessonsUncheckedCreateWithoutGroupInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    teacherId?: string | null
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendancesUncheckedCreateNestedManyWithoutLessonsInput
  }

  export type LessonsCreateOrConnectWithoutGroupInput = {
    where: LessonsWhereUniqueInput
    create: XOR<LessonsCreateWithoutGroupInput, LessonsUncheckedCreateWithoutGroupInput>
  }

  export type LessonsCreateManyGroupInputEnvelope = {
    data: LessonsCreateManyGroupInput | LessonsCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithWhereUniqueWithoutGroupInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutGroupInput, StudentUncheckedUpdateWithoutGroupInput>
    create: XOR<StudentCreateWithoutGroupInput, StudentUncheckedCreateWithoutGroupInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutGroupInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutGroupInput, StudentUncheckedUpdateWithoutGroupInput>
  }

  export type StudentUpdateManyWithWhereWithoutGroupInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutGroupInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    id?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    birthday?: DateTimeFilter<"Student"> | Date | string
    phone?: StringFilter<"Student"> | string
    cameText?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    groupId?: StringNullableFilter<"Student"> | string | null
  }

  export type TeacherUpsertWithoutGroupInput = {
    update: XOR<TeacherUpdateWithoutGroupInput, TeacherUncheckedUpdateWithoutGroupInput>
    create: XOR<TeacherCreateWithoutGroupInput, TeacherUncheckedCreateWithoutGroupInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutGroupInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutGroupInput, TeacherUncheckedUpdateWithoutGroupInput>
  }

  export type TeacherUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutTeachersNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutTeachersNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type CourseUpsertWithoutGroupsInput = {
    update: XOR<CourseUpdateWithoutGroupsInput, CourseUncheckedUpdateWithoutGroupsInput>
    create: XOR<CourseCreateWithoutGroupsInput, CourseUncheckedCreateWithoutGroupsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutGroupsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutGroupsInput, CourseUncheckedUpdateWithoutGroupsInput>
  }

  export type CourseUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneWithoutCoursesNestedInput
    teacher?: TeacherUpdateManyWithoutCoursesNestedInput
    students?: StudentUpdateManyWithoutCoursesNestedInput
  }

  export type CourseUncheckedUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUncheckedUpdateManyWithoutCoursesNestedInput
    students?: StudentUncheckedUpdateManyWithoutCoursesNestedInput
  }

  export type PaymentsUpsertWithWhereUniqueWithoutGroupInput = {
    where: PaymentsWhereUniqueInput
    update: XOR<PaymentsUpdateWithoutGroupInput, PaymentsUncheckedUpdateWithoutGroupInput>
    create: XOR<PaymentsCreateWithoutGroupInput, PaymentsUncheckedCreateWithoutGroupInput>
  }

  export type PaymentsUpdateWithWhereUniqueWithoutGroupInput = {
    where: PaymentsWhereUniqueInput
    data: XOR<PaymentsUpdateWithoutGroupInput, PaymentsUncheckedUpdateWithoutGroupInput>
  }

  export type PaymentsUpdateManyWithWhereWithoutGroupInput = {
    where: PaymentsScalarWhereInput
    data: XOR<PaymentsUpdateManyMutationInput, PaymentsUncheckedUpdateManyWithoutGroupInput>
  }

  export type LessonsUpsertWithWhereUniqueWithoutGroupInput = {
    where: LessonsWhereUniqueInput
    update: XOR<LessonsUpdateWithoutGroupInput, LessonsUncheckedUpdateWithoutGroupInput>
    create: XOR<LessonsCreateWithoutGroupInput, LessonsUncheckedCreateWithoutGroupInput>
  }

  export type LessonsUpdateWithWhereUniqueWithoutGroupInput = {
    where: LessonsWhereUniqueInput
    data: XOR<LessonsUpdateWithoutGroupInput, LessonsUncheckedUpdateWithoutGroupInput>
  }

  export type LessonsUpdateManyWithWhereWithoutGroupInput = {
    where: LessonsScalarWhereInput
    data: XOR<LessonsUpdateManyMutationInput, LessonsUncheckedUpdateManyWithoutGroupInput>
  }

  export type TeacherCreateWithoutSubjectsInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutTeacherInput
    group?: GroupsCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesCreateNestedManyWithoutTeacherInput
    lessons?: LessonsCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutSubjectsInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    group?: GroupsUncheckedCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutTeacherInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutSubjectsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput>
  }

  export type CourseCreateWithoutSubjectInput = {
    id?: string
    name: string
    desc: string
    price: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherCreateNestedManyWithoutCoursesInput
    students?: StudentCreateNestedManyWithoutCoursesInput
    groups?: GroupsCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutSubjectInput = {
    id?: string
    name: string
    desc: string
    price: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherUncheckedCreateNestedManyWithoutCoursesInput
    students?: StudentUncheckedCreateNestedManyWithoutCoursesInput
    groups?: GroupsUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutSubjectInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutSubjectInput, CourseUncheckedCreateWithoutSubjectInput>
  }

  export type CourseCreateManySubjectInputEnvelope = {
    data: CourseCreateManySubjectInput | CourseCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type TeacherUpsertWithWhereUniqueWithoutSubjectsInput = {
    where: TeacherWhereUniqueInput
    update: XOR<TeacherUpdateWithoutSubjectsInput, TeacherUncheckedUpdateWithoutSubjectsInput>
    create: XOR<TeacherCreateWithoutSubjectsInput, TeacherUncheckedCreateWithoutSubjectsInput>
  }

  export type TeacherUpdateWithWhereUniqueWithoutSubjectsInput = {
    where: TeacherWhereUniqueInput
    data: XOR<TeacherUpdateWithoutSubjectsInput, TeacherUncheckedUpdateWithoutSubjectsInput>
  }

  export type TeacherUpdateManyWithWhereWithoutSubjectsInput = {
    where: TeacherScalarWhereInput
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyWithoutSubjectsInput>
  }

  export type TeacherScalarWhereInput = {
    AND?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
    OR?: TeacherScalarWhereInput[]
    NOT?: TeacherScalarWhereInput | TeacherScalarWhereInput[]
    id?: StringFilter<"Teacher"> | string
    name?: StringFilter<"Teacher"> | string
    birthday?: DateTimeFilter<"Teacher"> | Date | string
    phone?: StringFilter<"Teacher"> | string
    ratings?: FloatNullableFilter<"Teacher"> | number | null
    email?: StringFilter<"Teacher"> | string
    avatarUrl?: StringFilter<"Teacher"> | string
    avatarFileId?: StringNullableFilter<"Teacher"> | string | null
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
  }

  export type CourseUpsertWithWhereUniqueWithoutSubjectInput = {
    where: CourseWhereUniqueInput
    update: XOR<CourseUpdateWithoutSubjectInput, CourseUncheckedUpdateWithoutSubjectInput>
    create: XOR<CourseCreateWithoutSubjectInput, CourseUncheckedCreateWithoutSubjectInput>
  }

  export type CourseUpdateWithWhereUniqueWithoutSubjectInput = {
    where: CourseWhereUniqueInput
    data: XOR<CourseUpdateWithoutSubjectInput, CourseUncheckedUpdateWithoutSubjectInput>
  }

  export type CourseUpdateManyWithWhereWithoutSubjectInput = {
    where: CourseScalarWhereInput
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyWithoutSubjectInput>
  }

  export type SubjectCreateWithoutCoursesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teachers?: TeacherCreateNestedManyWithoutSubjectsInput
  }

  export type SubjectUncheckedCreateWithoutCoursesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    teachers?: TeacherUncheckedCreateNestedManyWithoutSubjectsInput
  }

  export type SubjectCreateOrConnectWithoutCoursesInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutCoursesInput, SubjectUncheckedCreateWithoutCoursesInput>
  }

  export type TeacherCreateWithoutCoursesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutTeachersInput
    group?: GroupsCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesCreateNestedManyWithoutTeacherInput
    lessons?: LessonsCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutCoursesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutTeachersInput
    group?: GroupsUncheckedCreateNestedManyWithoutTeacherInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutTeacherInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutCoursesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput>
  }

  export type StudentCreateWithoutCoursesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    cameFrom?: cameFromCreateNestedOneWithoutStudentsInput
    group?: GroupsCreateNestedOneWithoutStudentsInput
    attendances?: AttendancesCreateNestedManyWithoutStudentInput
    payments?: PaymentsCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutCoursesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    cameText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: string | null
    attendances?: AttendancesUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutCoursesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput>
  }

  export type GroupsCreateWithoutCourseInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutGroupInput
    teacher?: TeacherCreateNestedOneWithoutGroupInput
    payments?: PaymentsCreateNestedManyWithoutGroupInput
    lessons?: LessonsCreateNestedManyWithoutGroupInput
  }

  export type GroupsUncheckedCreateWithoutCourseInput = {
    id?: string
    name: string
    teacherId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutGroupInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutGroupInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupsCreateOrConnectWithoutCourseInput = {
    where: GroupsWhereUniqueInput
    create: XOR<GroupsCreateWithoutCourseInput, GroupsUncheckedCreateWithoutCourseInput>
  }

  export type GroupsCreateManyCourseInputEnvelope = {
    data: GroupsCreateManyCourseInput | GroupsCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type SubjectUpsertWithoutCoursesInput = {
    update: XOR<SubjectUpdateWithoutCoursesInput, SubjectUncheckedUpdateWithoutCoursesInput>
    create: XOR<SubjectCreateWithoutCoursesInput, SubjectUncheckedCreateWithoutCoursesInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutCoursesInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutCoursesInput, SubjectUncheckedUpdateWithoutCoursesInput>
  }

  export type SubjectUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teachers?: TeacherUpdateManyWithoutSubjectsNestedInput
  }

  export type SubjectUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teachers?: TeacherUncheckedUpdateManyWithoutSubjectsNestedInput
  }

  export type TeacherUpsertWithWhereUniqueWithoutCoursesInput = {
    where: TeacherWhereUniqueInput
    update: XOR<TeacherUpdateWithoutCoursesInput, TeacherUncheckedUpdateWithoutCoursesInput>
    create: XOR<TeacherCreateWithoutCoursesInput, TeacherUncheckedCreateWithoutCoursesInput>
  }

  export type TeacherUpdateWithWhereUniqueWithoutCoursesInput = {
    where: TeacherWhereUniqueInput
    data: XOR<TeacherUpdateWithoutCoursesInput, TeacherUncheckedUpdateWithoutCoursesInput>
  }

  export type TeacherUpdateManyWithWhereWithoutCoursesInput = {
    where: TeacherScalarWhereInput
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyWithoutCoursesInput>
  }

  export type StudentUpsertWithWhereUniqueWithoutCoursesInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutCoursesInput, StudentUncheckedUpdateWithoutCoursesInput>
    create: XOR<StudentCreateWithoutCoursesInput, StudentUncheckedCreateWithoutCoursesInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutCoursesInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutCoursesInput, StudentUncheckedUpdateWithoutCoursesInput>
  }

  export type StudentUpdateManyWithWhereWithoutCoursesInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutCoursesInput>
  }

  export type GroupsUpsertWithWhereUniqueWithoutCourseInput = {
    where: GroupsWhereUniqueInput
    update: XOR<GroupsUpdateWithoutCourseInput, GroupsUncheckedUpdateWithoutCourseInput>
    create: XOR<GroupsCreateWithoutCourseInput, GroupsUncheckedCreateWithoutCourseInput>
  }

  export type GroupsUpdateWithWhereUniqueWithoutCourseInput = {
    where: GroupsWhereUniqueInput
    data: XOR<GroupsUpdateWithoutCourseInput, GroupsUncheckedUpdateWithoutCourseInput>
  }

  export type GroupsUpdateManyWithWhereWithoutCourseInput = {
    where: GroupsScalarWhereInput
    data: XOR<GroupsUpdateManyMutationInput, GroupsUncheckedUpdateManyWithoutCourseInput>
  }

  export type StudentCreateWithoutAttendancesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutStudentsInput
    cameFrom?: cameFromCreateNestedOneWithoutStudentsInput
    group?: GroupsCreateNestedOneWithoutStudentsInput
    payments?: PaymentsCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAttendancesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    cameText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutStudentsInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAttendancesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
  }

  export type TeacherCreateWithoutAttendancesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectCreateNestedManyWithoutTeachersInput
    courses?: CourseCreateNestedManyWithoutTeacherInput
    group?: GroupsCreateNestedManyWithoutTeacherInput
    lessons?: LessonsCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutAttendancesInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    ratings?: number | null
    email: string
    avatarUrl: string
    avatarFileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    subjects?: SubjectUncheckedCreateNestedManyWithoutTeachersInput
    courses?: CourseUncheckedCreateNestedManyWithoutTeacherInput
    group?: GroupsUncheckedCreateNestedManyWithoutTeacherInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutAttendancesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutAttendancesInput, TeacherUncheckedCreateWithoutAttendancesInput>
  }

  export type LessonsCreateWithoutAttendanceInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group?: GroupsCreateNestedOneWithoutLessonsInput
    teacher?: TeacherCreateNestedOneWithoutLessonsInput
  }

  export type LessonsUncheckedCreateWithoutAttendanceInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: string | null
    teacherId?: string | null
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LessonsCreateOrConnectWithoutAttendanceInput = {
    where: LessonsWhereUniqueInput
    create: XOR<LessonsCreateWithoutAttendanceInput, LessonsUncheckedCreateWithoutAttendanceInput>
  }

  export type StudentUpsertWithoutAttendancesInput = {
    update: XOR<StudentUpdateWithoutAttendancesInput, StudentUncheckedUpdateWithoutAttendancesInput>
    create: XOR<StudentCreateWithoutAttendancesInput, StudentUncheckedCreateWithoutAttendancesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAttendancesInput, StudentUncheckedUpdateWithoutAttendancesInput>
  }

  export type StudentUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutStudentsNestedInput
    cameFrom?: cameFromUpdateOneWithoutStudentsNestedInput
    group?: GroupsUpdateOneWithoutStudentsNestedInput
    payments?: PaymentsUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type TeacherUpsertWithoutAttendancesInput = {
    update: XOR<TeacherUpdateWithoutAttendancesInput, TeacherUncheckedUpdateWithoutAttendancesInput>
    create: XOR<TeacherCreateWithoutAttendancesInput, TeacherUncheckedCreateWithoutAttendancesInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutAttendancesInput, TeacherUncheckedUpdateWithoutAttendancesInput>
  }

  export type TeacherUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutTeachersNestedInput
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    group?: GroupsUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutAttendancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutTeachersNestedInput
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    group?: GroupsUncheckedUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type LessonsUpsertWithoutAttendanceInput = {
    update: XOR<LessonsUpdateWithoutAttendanceInput, LessonsUncheckedUpdateWithoutAttendanceInput>
    create: XOR<LessonsCreateWithoutAttendanceInput, LessonsUncheckedCreateWithoutAttendanceInput>
    where?: LessonsWhereInput
  }

  export type LessonsUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: LessonsWhereInput
    data: XOR<LessonsUpdateWithoutAttendanceInput, LessonsUncheckedUpdateWithoutAttendanceInput>
  }

  export type LessonsUpdateWithoutAttendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupsUpdateOneWithoutLessonsNestedInput
    teacher?: TeacherUpdateOneWithoutLessonsNestedInput
  }

  export type LessonsUncheckedUpdateWithoutAttendanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupsCreateWithoutPaymentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutGroupInput
    teacher?: TeacherCreateNestedOneWithoutGroupInput
    course?: CourseCreateNestedOneWithoutGroupsInput
    lessons?: LessonsCreateNestedManyWithoutGroupInput
  }

  export type GroupsUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    courseId?: string | null
    teacherId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutGroupInput
    lessons?: LessonsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupsCreateOrConnectWithoutPaymentsInput = {
    where: GroupsWhereUniqueInput
    create: XOR<GroupsCreateWithoutPaymentsInput, GroupsUncheckedCreateWithoutPaymentsInput>
  }

  export type StudentCreateWithoutPaymentsInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutStudentsInput
    cameFrom?: cameFromCreateNestedOneWithoutStudentsInput
    group?: GroupsCreateNestedOneWithoutStudentsInput
    attendances?: AttendancesCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    cameText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutStudentsInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPaymentsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
  }

  export type GroupsUpsertWithoutPaymentsInput = {
    update: XOR<GroupsUpdateWithoutPaymentsInput, GroupsUncheckedUpdateWithoutPaymentsInput>
    create: XOR<GroupsCreateWithoutPaymentsInput, GroupsUncheckedCreateWithoutPaymentsInput>
    where?: GroupsWhereInput
  }

  export type GroupsUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: GroupsWhereInput
    data: XOR<GroupsUpdateWithoutPaymentsInput, GroupsUncheckedUpdateWithoutPaymentsInput>
  }

  export type GroupsUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutGroupNestedInput
    teacher?: TeacherUpdateOneWithoutGroupNestedInput
    course?: CourseUpdateOneWithoutGroupsNestedInput
    lessons?: LessonsUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type StudentUpsertWithoutPaymentsInput = {
    update: XOR<StudentUpdateWithoutPaymentsInput, StudentUncheckedUpdateWithoutPaymentsInput>
    create: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPaymentsInput, StudentUncheckedUpdateWithoutPaymentsInput>
  }

  export type StudentUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutStudentsNestedInput
    cameFrom?: cameFromUpdateOneWithoutStudentsNestedInput
    group?: GroupsUpdateOneWithoutStudentsNestedInput
    attendances?: AttendancesUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutCameFromInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    courses?: CourseCreateNestedManyWithoutStudentsInput
    group?: GroupsCreateNestedOneWithoutStudentsInput
    attendances?: AttendancesCreateNestedManyWithoutStudentInput
    payments?: PaymentsCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutCameFromInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: string | null
    courses?: CourseUncheckedCreateNestedManyWithoutStudentsInput
    attendances?: AttendancesUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentsUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutCameFromInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutCameFromInput, StudentUncheckedCreateWithoutCameFromInput>
  }

  export type StudentCreateManyCameFromInputEnvelope = {
    data: StudentCreateManyCameFromInput | StudentCreateManyCameFromInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithWhereUniqueWithoutCameFromInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutCameFromInput, StudentUncheckedUpdateWithoutCameFromInput>
    create: XOR<StudentCreateWithoutCameFromInput, StudentUncheckedCreateWithoutCameFromInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutCameFromInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutCameFromInput, StudentUncheckedUpdateWithoutCameFromInput>
  }

  export type StudentUpdateManyWithWhereWithoutCameFromInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutCameFromInput>
  }

  export type AttendancesCreateManyStudentInput = {
    id?: string
    desc: string
    teacherId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonsId?: string | null
  }

  export type PaymentsCreateManyStudentInput = {
    id?: string
    date: Date | string
    groupId?: string | null
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CourseUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneWithoutCoursesNestedInput
    teacher?: TeacherUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUncheckedUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendancesUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneWithoutAttendancesNestedInput
    lessons?: LessonsUpdateOneWithoutAttendanceNestedInput
  }

  export type AttendancesUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonsId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendancesUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonsId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentsUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupsUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentsUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentsUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupsCreateManyTeacherInput = {
    id?: string
    name: string
    courseId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendancesCreateManyTeacherInput = {
    id?: string
    desc: string
    studentId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    lessonsId?: string | null
  }

  export type LessonsCreateManyTeacherInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: string | null
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubjectUpdateWithoutTeachersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutTeachersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateManyWithoutTeachersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneWithoutCoursesNestedInput
    students?: StudentUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    subjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupsUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutGroupNestedInput
    course?: CourseUpdateOneWithoutGroupsNestedInput
    payments?: PaymentsUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutGroupNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    courseId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendancesUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneWithoutAttendancesNestedInput
    lessons?: LessonsUpdateOneWithoutAttendanceNestedInput
  }

  export type AttendancesUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonsId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AttendancesUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lessonsId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonsUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupsUpdateOneWithoutLessonsNestedInput
    attendance?: AttendancesUpdateManyWithoutLessonsNestedInput
  }

  export type LessonsUncheckedUpdateWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendancesUncheckedUpdateManyWithoutLessonsNestedInput
  }

  export type LessonsUncheckedUpdateManyWithoutTeacherInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendancesCreateManyLessonsInput = {
    id?: string
    desc: string
    studentId?: string | null
    teacherId?: string | null
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AttendancesUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneWithoutAttendancesNestedInput
    teacher?: TeacherUpdateOneWithoutAttendancesNestedInput
  }

  export type AttendancesUncheckedUpdateWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendancesUncheckedUpdateManyWithoutLessonsInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyGroupInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    cameText?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentsCreateManyGroupInput = {
    id?: string
    date: Date | string
    desc: string
    amount: string
    createdAt?: Date | string
    updatedAt?: Date | string
    studentId?: string | null
  }

  export type LessonsCreateManyGroupInput = {
    id?: string
    desc: string
    daysOfWeek?: LessonsCreatedaysOfWeekInput | $Enums.DaysOfWeek[]
    teacherId?: string | null
    startTime: Date | string
    endTime: Date | string
    room: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutStudentsNestedInput
    cameFrom?: cameFromUpdateOneWithoutStudentsNestedInput
    attendances?: AttendancesUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentsUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentsUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentsUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    amount?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LessonsUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneWithoutLessonsNestedInput
    attendance?: AttendancesUpdateManyWithoutLessonsNestedInput
  }

  export type LessonsUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendancesUncheckedUpdateManyWithoutLessonsNestedInput
  }

  export type LessonsUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    daysOfWeek?: LessonsUpdatedaysOfWeekInput | $Enums.DaysOfWeek[]
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseCreateManySubjectInput = {
    id?: string
    name: string
    desc: string
    price: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutTeacherNestedInput
    group?: GroupsUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUncheckedUpdateManyWithoutTeacherNestedInput
    group?: GroupsUncheckedUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateManyWithoutSubjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CourseUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateManyWithoutCoursesNestedInput
    students?: StudentUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUncheckedUpdateManyWithoutCoursesNestedInput
    students?: StudentUncheckedUpdateManyWithoutCoursesNestedInput
    groups?: GroupsUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateManyWithoutSubjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    desc?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupsCreateManyCourseInput = {
    id?: string
    name: string
    teacherId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUpdateManyWithoutTeachersNestedInput
    group?: GroupsUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjects?: SubjectUncheckedUpdateManyWithoutTeachersNestedInput
    group?: GroupsUncheckedUpdateManyWithoutTeacherNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutTeacherNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateManyWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    ratings?: NullableFloatFieldUpdateOperationsInput | number | null
    email?: StringFieldUpdateOperationsInput | string
    avatarUrl?: StringFieldUpdateOperationsInput | string
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cameFrom?: cameFromUpdateOneWithoutStudentsNestedInput
    group?: GroupsUpdateOneWithoutStudentsNestedInput
    attendances?: AttendancesUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    attendances?: AttendancesUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutCoursesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    cameText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GroupsUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutGroupNestedInput
    teacher?: TeacherUpdateOneWithoutGroupNestedInput
    payments?: PaymentsUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutGroupNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutGroupNestedInput
    lessons?: LessonsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupsUncheckedUpdateManyWithoutCourseInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    teacherId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyCameFromInput = {
    id?: string
    name: string
    birthday: Date | string
    phone: string
    createdAt?: Date | string
    updatedAt?: Date | string
    groupId?: string | null
  }

  export type StudentUpdateWithoutCameFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    courses?: CourseUpdateManyWithoutStudentsNestedInput
    group?: GroupsUpdateOneWithoutStudentsNestedInput
    attendances?: AttendancesUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutCameFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    courses?: CourseUncheckedUpdateManyWithoutStudentsNestedInput
    attendances?: AttendancesUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentsUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutCameFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
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