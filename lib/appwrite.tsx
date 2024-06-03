import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ak.artsygen',
    projectId: '665d45eb00397f876aa4',
    databaseId: '665d473d0023738c73fa',
    usersCollectionId: '665d47650000dedc1e9b',
    videoCollectionId: '665d479100382a4b2750',
    storageId: '665d49a9003a91e5f3dc'
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

//registering a user
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );
        return newUser;
    } catch (error) {
        throw new Error(error as string);
    }
}

//signing a new user in
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error as string);
    }
}

//getting an account
export async function getAccount() {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        throw new Error(error as string);
    }
}

//getting the current session user and data
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

//signing a user out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error as string);
    }
}

//uploading a new file
export async function uploadFile(file, type) {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error as string)
    }
}

//retrieving file preview
export async function getFilePreview(fileId, type) {
    let fileUrl;
    
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } 
        else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                20000,
                "top",
                100
            )
        }
        else {
            throw new Error("Invalid file type");
        }
        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error as string);
    }
}

//do the video posting stuff from here on out

// Register User
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
