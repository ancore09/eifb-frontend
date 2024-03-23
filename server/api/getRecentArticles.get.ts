import PocketBase from "pocketbase";

export default defineEventHandler(async (event) => {
    let pb = event.context.pb

    let articles = await pb.collection('articles').getList(1, 10, {
      sort: '-created',
    })

    return articles
})
