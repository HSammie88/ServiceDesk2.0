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
    if (localStorage.getItem(table) === null) {
      localStorage.setItem(table, JSON.stringify([]));
      createFirstUser(table);
    }
  });
}

function QueriesBuilder<T>(table: string, idKey: keyof T) {
  const _read = async (): Promise<T[]> => {
    try {
      const data = JSON.parse(localStorage.getItem(table)!);
      if (!Array.isArray(data)) throw new Error("Данных не существует");
      return await data;
    } catch (err) {
      console.error("Ошибка чтения: ", err);
      throw err;
    }
  };
  return {
    read: _read,
    readOne: async (id: number): Promise<T> => {
      try {
        const localData = await _read();
        const foundItem = localData.find((item) =>
          item[idKey] === id ? item : null
        );
        if (!foundItem) throw new Error("ID не существует");
        return foundItem;
      } catch (err) {
        console.error("Ошибка поиска: ", err);
        throw err;
      }
    },
    create: async (data: T) => {
      try {
        const localData = await _read();
        const updatedData = [...localData, data];
        localStorage.setItem(table, JSON.stringify(updatedData));
      } catch (err) {
        console.error("Ошибка создания: ", err);
        throw err;
      }
    },
    update: async (id: number, update: Partial<T>) => {
      try {
        const localData = await _read();
        const updatedData = localData.map((item) =>
          item[idKey] === id ? { ...item, ...update } : item
        );
        localStorage.setItem(table, JSON.stringify(updatedData));
      } catch (err) {
        console.error("Ошибка обновления: ", err);
        throw err;
      }
    },
    remove: async (id: number) => {
      try {
        const localData = await _read();
        const updatedData = localData.filter((item) => item[idKey] !== id);
        if (localData.length === updatedData.length)
          throw new Error("ID не найден");
        localStorage.setItem(table, JSON.stringify(updatedData));
      } catch (err) {
        console.error("Ошибка удаления: ", err);
        throw err;
      }
    },
  };
}

const DepartmentQueries: IBaseQueries<IDepartment> = QueriesBuilder(
  "departments",
  "depart_id"
);
const PositionQueries: IBaseQueries<IPosition> = QueriesBuilder(
  "positions",
  "position_id"
);
const BaseUserQueries: IBaseQueries<IUser> = QueriesBuilder("users", "user_id");
const CategoryQueries: IBaseQueries<ICategory> = QueriesBuilder(
  "categories",
  "category_id"
);
const SubcategoryQueries: IBaseQueries<ISubcategory> = QueriesBuilder(
  "subcategories",
  "subcategories_id"
);
const TicketQueries: IBaseQueries<ITicket> = QueriesBuilder(
  "tickets",
  "ticket_id"
);
const CommentQueries: IBaseQueries<IComment> = QueriesBuilder(
  "comments",
  "comment_id"
);

const UserQueries = {
    ...BaseUserQueries,
    login: async(login: string, password: string): Promise<IUser>=>{
        try{
            const users = await BaseUserQueries.read()
            const found = users.find(item => item.user_login === login && item.user_password === password)
            if(!found) throw new Error("Неверные учетные данные")
            return found
        }catch(err){
            console.error("Ошибка авторизации: ",err)
            throw err
        }
    }
}

function createFirstUser(currentTable: string) {
  let writer: IDepartment | IPosition | IUser | object = {};
  switch (currentTable) {
    case "departments":
      writer = {
        depart_id: 0,
        depart_name: "Temporary Administrators",
        deleted: false,
      };
      break;
    case "positions":
      writer = {
        position_id: 0,
        position_name: "Temporary Administrator",
        depart_id: 0,
        deleted: false,
      };
      break;
    case "users":
      writer = {
        user_id: 0,
        last_name: "Administrator",
        first_name: "Administrator",
        user_login: "admin",
        user_password: "admin",
        depart_id: 0,
        position_id: 0,
        user_is_admin: true,
        deleted: false,
      };
      break;
  }
  localStorage.setItem(currentTable, JSON.stringify([writer]));
}

export {
  InitDB,
  DepartmentQueries,
  PositionQueries,
  UserQueries,
  CategoryQueries,
  SubcategoryQueries,
  TicketQueries,
  CommentQueries,
};
