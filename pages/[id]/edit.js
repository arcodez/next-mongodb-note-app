import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

function EditNote({ note }) {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
        console.log(form);
        //alert("Sucess");
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateNote = async () => {
    try {
      await fetch(`http://localhost:3000/api/note/${router.query.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
    console.log(errors);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};
    if (!form.title) {
      setForm({ description: "" });
      err.title = "Title is required";
      alert(err.title);
    }
    if (!form.description) {
      setForm({ title: "" });
      err.description = "Description is required";
      alert(err.description);
    }
    return err;
  };

  return (
    <center>
      <h1>Crear Nota</h1>
      <div>
        {isSubmitting ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <br />
            <textarea
              name="description"
              label="Description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </center>
  );
}

EditNote.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/note/${id}`);
  const { data } = await res.json();
  return { note: data };
};

export default EditNote;
