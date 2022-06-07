import {randomBytes} from "crypto"

export async function createSession(userId, connection){
    const sessionToken = randomBytes(43).toString("hex")
    const {ip, userAgent} = connection
}