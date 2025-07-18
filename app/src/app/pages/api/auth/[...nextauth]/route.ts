// import NextAuth from "next-auth"
// const handler = NextAuth({
//   ...
// })
// export { handler as GET, handler as POST }
//After fix build:
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Lógica de autenticación
        return { id: '1', name: 'Jhair' }
      },
    }),
  ],
})

export { handler as GET, handler as POST }