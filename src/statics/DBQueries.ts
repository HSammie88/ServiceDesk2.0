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
  readOne: (id: IDType) => Promise<T>;
  update: (id: IDType, update: Partial<T>) => Promise<void>;
  remove: (id: IDType) => Promise<void>;
}

function InitDB() {
  const TABLES = [
    "departments",
    "positions",
    "users",
    "tickets",
    "categories",
    "subcategories",
    "comments",
  ];
  TABLES.forEach((table) => {
    if (localStorage.getItem(table) === null)
      localStorage.setItem(table, JSON.stringify([]));
  });
}

function QueriesBuilder<T>(table: string, idKey: keyof T){
    const _read = async (): Promise<T[]> => {
        try{
            const data = JSON.parse(localStorage.getItem(table)!)
            if(!Array.isArray(data)) throw new Error("Данных не существует")
            return await data
        }catch(err){
            console.error("Ошибка чтения: ", err)
            throw err
        }
    }
    return {
        read: _read,
        readOne: async (id: number): Promise<T> =>{
            try{
                const localData = await _read()
                const foundItem = localData.find(item => item[idKey] === id ? item : null)
                if (!foundItem) throw new Error("ID не существует")
                return foundItem
            }catch(err){
                console.error("Ошибка поиска: ", err)
                throw err
            }
        },
        create: async (data: T) => {
            try{
                const localData = await _read()
                const updatedData = [...localData, data]
                localStorage.setItem(table, JSON.stringify(updatedData))
            }catch(err){
                console.error("Ошибка создания: ", err)
                throw err
            }
        },
        update: async (id: number, update: Partial<T>) => {
            try{
                const localData = await _read()
                const updatedData = localData.map(item => item[idKey] === id ? {...item, ...update}: item)
                localStorage.setItem(table,JSON.stringify(updatedData))
            }catch(err){
                console.error("Ошибка обновления: ", err)
                throw err
            }
        },
        remove: async (id: number)=>{
            try{
                const localData = await _read()
                const updatedData = localData.filter(item => item[idKey] !== id)
                if(localData.length === updatedData.length) throw new Error("ID не найден")
                localStorage.setItem(table, JSON.stringify(updatedData))
            }catch(err){
                console.error("Ошибка удаления: ",err)
                throw err
            }
        }
    }
}

const DepartmentQueries: IBaseQueries<IDepartment> = QueriesBuilder("departments", "depart_id")
const PositionQueries: IBaseQueries<IPosition> = QueriesBuilder("positions", "position_id")
const UserQueries: IBaseQueries<IUser> = QueriesBuilder("users", "user_id")
const CategoryQueries: IBaseQueries<ICategory> = QueriesBuilder("categories", "category_id")
const SubcategoryQueries: IBaseQueries<ISubcategory> = QueriesBuilder("subcategories", "subcategories_id")
const TicketQueries: IBaseQueries<ITicket> = QueriesBuilder("tickets", "ticket_id")
const CommentQueries: IBaseQueries<IComment> = QueriesBuilder("comments", "comment_id")

export {InitDB, DepartmentQueries, PositionQueries, UserQueries, CategoryQueries, SubcategoryQueries, TicketQueries, CommentQueries}
