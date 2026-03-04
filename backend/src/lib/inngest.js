import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "interview-forge" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkID: id,
      email: email_addresses[0]?.email_address,
      name: `${firstname || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    //do smt else
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({ clerkID: id });

    //todo :something else
  },
);

export const functions = [syncUser, deleteUserFromDB];
