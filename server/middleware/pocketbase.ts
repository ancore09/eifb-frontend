import PocketBase from "pocketbase";

export default defineEventHandler((event) => {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const cookie = getCookie(event, 'pb_auth')
    if (cookie) {
        let c = JSON.parse(cookie ?? '{}')
        pb.authStore.save(c.token, c.model);
    }

    event.context.pb = pb
})
