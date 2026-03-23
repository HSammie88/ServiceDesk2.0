import type {
  ICategory,
  IComment,
  IDepartment,
  IPosition,
  ISubcategory,
  ITicket,
  IUser,
} from "../types";

interface IBaseQueries<T, IDType = number> {
  create: (data: T) => Promise<void>;
  read: () => Promise<T[]>;
  update: (id: IDType, update: Partial<T>) => Promise<void>;
  remove: (id: IDType) => Promise<void>;
}

type IDepartmentQueries = IBaseQueries<IDepartment>;
type IPositionsQueries = IBaseQueries<IPosition>;
type ICategoryQueries = IBaseQueries<ICategory>;
type ISubcategoryQueries = IBaseQueries<ISubcategory>;
type ITicketQueries = IBaseQueries<ITicket>;
type ICommentsQueries = IBaseQueries<IComment>;
type IUsersQueries = IBaseQueries<IUser>;
