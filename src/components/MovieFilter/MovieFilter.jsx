import { Form, Field, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";

export default function MovieFilter({ onSearch }) {
    return (
    <div>
      <Toaster />
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (!values.query.trim()) {
            toast.error("Please type your text!")
          } else {
            onSearch(values.query);
            toast.success("Awesome!🥳")
            actions.resetForm()
          }
        }}>
        
        <Form>
          <Field
            type="text"
            name="query"
            placeholder="Type here..."
            autoComplete="off"
            autoFocus
            // className={css.field}
          />
          <button type="submit" className={css.btn}>Click to start!</button>
        </Form>
</Formik>
        </div>
    
  )
}