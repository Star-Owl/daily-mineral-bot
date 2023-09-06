export default function getReminderMessage() {
    const now = new Date()
    const targetTime = new Date(now.setHours(15, 0, 0, 0))
    const timestamp = Math.floor(targetTime.getTime() / 1000)
    return `Daily dose of mineral <t:${timestamp}:R>`
}
