import React from "react";
import { useRouter } from "next/router";

function Note({ note }) {
  const router = useRouter();

  const deletedNote = async () => {
    const noteId = router.query.id;
    try {
      await fetch(`http://localhost:3000/api/note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>{note.title}</h1>
      <h3>{note.description}</h3>
      <button onClick={deletedNote}>Delete</button>
      <button onClick={() => router.push('/')}>Ver Notas</button>
    </div>
  );
}

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/note/${id}`);
  const { data } = await res.json();
  return { note: data };
};
export default Note;
