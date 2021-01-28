/***************************************************************************************************
 * USER DEFINED TYPES
 */
export type Diff<T, U> = T extends U ? never : T;
export type OptionalExceptFor<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>
export type RequiredExceptFor<T, TOptional extends keyof T> = Pick<T, Diff<keyof T, TOptional>> & Partial<T>;