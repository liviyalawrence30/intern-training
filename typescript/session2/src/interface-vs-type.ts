interface PaginationResponse<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
};
//Using interface because it is an object shape and can be extended later.

type StringOrStringArray = string | string[];
// Using type because union types are better written with type.

interface Notification {
  id: string;
  message: string;
  createdAt: Date;
};
interface EmailNotification extends Notification {
  email: string;
  subject: string;
};
interface PushNotification extends Notification {
  deviceId: string;
  title: string;
};
// Using interface because other notification types can extend it.

type NumberCallback = (num: number) => void;
//using type because function signatures are often written as type aliases.

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
//using type beacuse of the use of 'unions'.

