import React from "react";
import Link from "next/link";

export const getStaticProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/note");
    const { data } = await res.json();
    return {
      props: { notes: data },
    };
  } catch (error) {
    console.log(error);
  }
};

function notas({ notes }) {
  return (
    <center>
      <br />
      <br />
      <br />

      <div className="container">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="container mt-5">
              <Link href={`/${note._id}`}>
                <a>
                  <h3>{note.title}</h3>
                </a>
              </Link>
              <p>{note.description}</p>
              <Link href={`/${note._id}`}>
                <button>View</button>
              </Link>
              <Link href={`/${note._id}/edit`}>
                <button>Edit</button>
              </Link>
            </div>
          ))
        ) : (
          <h1>No hay Notas</h1>
        )}
        <Link href="/new">
          <a>
            <button>Ingresa Una Nueva Nota</button>
          </a>
        </Link>
      </div>
    </center>
  );
}
export default notas;
