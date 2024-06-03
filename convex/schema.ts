import { defineSchema, defineTable, } from "convex/server";
import { Validator, v  } from "convex/values";

// The users, accounts, sessions and verificationTokens tables are modeled
// from https://authjs.dev/getting-started/adapters#models


export const userSchema = {
    email: v.string(),
    name: v.optional(v.string()),
    emailVerified: v.optional(v.number()),
    image: v.optional(v.string()),
    username: v.string(),
    hashPassword: v.string(),
    role: v.union(
      v.literal('PANITIA'),
      v.literal('ADMIN')
    ),
    pos: v.array(v.id('pos')),
    sessions: v.array(v.id('sessions')),
  };
  
export const sessionSchema = {
    userID: v.id('users'),
    expires: v.number(),
    sessionToken: v.string(),
}
  
export const kategoriSchema = {
    namaKategori: v.string(),
    startDate:v.string(),
    isEnded: v.optional(v.boolean()),
    peserta: v.array(v.id('peserta')),
    pos: v.array(v.id('pos')),
};
  
export const posSchema = {
    namaPos: v.string(),
    posFinish: v.optional(v.boolean()),
    kategoriID: v.id('kategori'),
    panitiaID: v.optional(v.id('users')),
    pesertaID: v.array(v.id('peserta')),
};
  
export const pesertaSchema = {
    noPeserta: v.optional(v.string()),
    name:v.optional(v.string()),
    tempatLahir:v.optional(v.string()),
    tglLahir:v.optional(v.string()),
    jenisKelamin: v.union(
        v.literal('Pria'),
        v.literal('Wanita')
    ),
    waktu: v.optional(v.string()),
    kategoriID: v.optional(v.id('kategori')),
    posId: v.array(v.id('pos')),
};
  
const initTable = {
    users: defineTable(userSchema)
        .index('email', ['email'])
        .index('username', ['username']),
    sessions: defineTable(sessionSchema)
        .index('sessionToken', ['sessionToken'])
        .index('userID', ['userID']),
    kategori: defineTable(kategoriSchema),
    pos: defineTable(posSchema),
    peserta: defineTable(pesertaSchema)
        .index('peserta_exist_in_category',['noPeserta', 'kategoriID'])
};
  
  export default defineSchema({
    ...initTable,    
  });

