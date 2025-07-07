import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/clerk-sdk-node'
import { NextResponse } from 'next/server'

console.log("Clerk webhook triggered")

export async function POST(req: NextRequest) {
  try {
    console.log("the code has reached to the post req");
    const evt = await verifyWebhook(req) as WebhookEvent
    const { id } = evt.data
    const eventType = evt.type

    console.log(" Webhook Event Type:", eventType)
    console.log(" Full Payload:", evt.data)

    // user.created
    if (eventType === 'user.created') {
      const { email_addresses, image_url, first_name, last_name, username } = evt.data

      if (!id || !username) {
        console.error(" Missing ID or username in webhook data")
        return NextResponse.json({ error: "Missing required user data" }, { status: 400 })
      }

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username,
        firstName: first_name ?? "",
        lastName: last_name ?? "",
        photo: image_url,
      }

      const newUser = await createUser(user)
      console.log("new user created");

      if (!newUser) {
        console.error(" User creation failed")
        return NextResponse.json({ error: "User not saved" }, { status: 500 })
      }
      console.log("reached the metadata");
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id
        }
      })

      return NextResponse.json({ message: 'OK', user: newUser })
    }

    // user.updated
    if (eventType === 'user.updated') {
      const { image_url, first_name, last_name, username } = evt.data

      if (!id || !username) {
        console.error(" Missing ID or username for update")
        return NextResponse.json({ error: "Missing required user data" }, { status: 400 })
      }

      const user = {
        firstName: first_name ?? "",
        lastName: last_name ?? "",
        username: username,
        photo: image_url,
      }

      const updatedUser = await updateUser(id, user)

      return NextResponse.json({ message: 'OK', user: updatedUser })
    }

    // user.deleted
    if (eventType === 'user.deleted') {
      if (!id) {
        return NextResponse.json({ error: "Missing ID for deletion" }, { status: 400 })
      }

      const deletedUser = await deleteUser(id)
      return NextResponse.json({ message: 'OK', user: deletedUser })
    }

    return new Response('Unhandled event type', { status: 200 })

  } catch (err) {
    console.error(' Error verifying webhook:', err)
    return new Response('Webhook verification failed', { status: 400 })
  }
}
