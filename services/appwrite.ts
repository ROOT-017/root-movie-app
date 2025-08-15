import { CreateImageUri } from "@/utils/index.utils";
import { Client, Databases, ID, Query } from "react-native-appwrite";

const APPWRITE_ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || "";
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || "";
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || "";
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID || "";

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (results.documents.length > 0) {
      const exitingMovie = results.documents[0];
      const updatedCount = exitingMovie.count + 1;
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        exitingMovie.$id,
        {
          count: updatedCount,
          // movieId: movie.id,
          // query: query.trim(),
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query.trim(),
        count: 1,
        movie_id: movie.id,
        poster_url: CreateImageUri(movie.poster_path),
        title: movie.title,
      });
    }
  } catch (err) {
    console.error("Error updating search count:", err);
    throw err;
  }
  //   console.log("Search results:", results);
};
