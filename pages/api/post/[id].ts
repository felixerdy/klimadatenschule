import prisma from '../../../lib/prisma'
import jwt from 'next-auth/jwt'

const secret = process.env.SECRET


// DELETE /api/post/:id
export default async function handle(req, res) {
    const postId = req.query.id

    if (req.method === 'DELETE') {
        const token = await jwt.getToken({ req, secret })

        if (token) {
            // Signed in

            // Get User
            const user = await prisma.user.findUnique({
                where: { id: token.sub }
            })

            // Get post to delete
            const post = await prisma.post.findUnique({
                where: { id: postId },
            })

            // user is author of post
            if (user && user.id === post.authorId) {
                await prisma.post.delete({
                    where: { id: postId },
                })
                res.json(post)
            } else {
                // Not allowed
                res.status(405)
            }
        } else {
            // Not Signed in
            res.status(401)
        }
        res.end()

    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}