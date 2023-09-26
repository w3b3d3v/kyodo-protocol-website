const { onRequest } = require("firebase-functions/v2/https")
const logger = require("firebase-functions/logger")

const functions = require("firebase-functions")
const admin = require("firebase-admin")

const axios = require("axios")

if (process.env.FUNCTIONS_EMULATOR) {
  admin.initializeApp({
    databaseURL: "http://localhost:9000", // Use the emulator URL when testing locally
  })
} else {
  admin.initializeApp()
}

function sendDiscordMessage(content, avatar_url) {
  const url =
    "https://discord.com/api/webhooks/979143707880222761/dpn2gt9IhEDRzkwICdCHDxwglww7zSjBi4wSlw-4F2t6Tpv8tCECyt8YtIf7py6I31oH"
  return axios.post(url, { content, avatar_url })
}

exports.captureNewNode = functions.database
  .ref("/{nodeType}/{nodeId}")
  .onCreate((snapshot, context) => {
    const email = snapshot.val()
    const nodeType = context.params.nodeType // This will capture 'business', 'community_leader', or 'professional'
    const nodeId = context.params.nodeId // This will capture the ID of the newly added record

    const msg = `New record added to ${nodeType} with ID ${nodeId} and email: ${email}`
    console.log(msg)

    return sendDiscordMessage(msg, "https://i.imgur.com/OyQ6ued.png").then((r) => {
      return null
    })
  })
