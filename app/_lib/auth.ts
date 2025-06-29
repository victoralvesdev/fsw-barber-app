import { AuthOptions, User, Account, Profile } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import { db } from "./prisma"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User; account: Account | null; profile?: Profile }) {
      // Criar/atualizar usuário no banco Supabase
      if (user.email) {
        try {
          await db.user.upsert({
            where: { email: user.email },
            create: {
              name: user.name || "",
              email: user.email,
            },
            update: {
              name: user.name || "",
            },
          })
        } catch (error) {
          console.error("Erro ao criar/atualizar usuário:", error)
          return false
        }
      }
      return true
    },
    async session({ session }: { session: Session; token: JWT }) {
      if (session.user?.email) {
        const dbUser = await db.user.findUnique({
          where: { email: session.user.email },
        })
        if (dbUser) {
          session.user = {
            ...session.user,
            id: dbUser.id,
          } as any
        }
      }
      return session
    },
    async jwt({ token }: { token: JWT; user?: User; account?: Account | null; profile?: Profile }) {
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
