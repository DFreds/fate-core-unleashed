async function createChatMessageToUserAndGms(message: string): Promise<void> {
    const gmUsers = game.users
        .filter((user) => user.isGM)
        .map((user) => user.id);

    const uniqueGmsAndUser = [...new Set([...gmUsers, game.userId])];

    await ChatMessage.create({
        author: game.userId,
        content: `<p>${message}</p>`,
        whisper: uniqueGmsAndUser,
    });
}

export { createChatMessageToUserAndGms };
