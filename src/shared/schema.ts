import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  decimal,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";

// Users table - stores user information
export const users = pgTable("users", {
  id: text("id").primaryKey(), // UUID from Supabase auth
  email: varchar("email", { length: 255 }).notNull().unique(),
  first_name: varchar("first_name", { length: 100 }),
  last_name: varchar("last_name", { length: 100 }),
  avatar_url: text("avatar_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

// Product categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  image_url: text("image_url"),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Categories relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Products table - stores product information
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image_url: text("image_url"),
  category_id: integer("category_id").references(() => categories.id),
  stock: integer("stock").default(0),
  is_featured: boolean("is_featured").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Product relations
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
  orderItems: many(orderItems),
}));

// Orders table - stores order information
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").references(() => users.id),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Order relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}));

// Order items table - stores items in an order
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => orders.id),
  product_id: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

// Order items relations
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.product_id],
    references: [products.id],
  }),
}));

// Export types for TypeScript
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;