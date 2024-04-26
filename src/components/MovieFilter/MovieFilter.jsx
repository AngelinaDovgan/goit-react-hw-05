// import { Form, Field, Formik } from "formik";
// import toast, { Toaster } from "react-hot-toast";

// export default function MovieFilter({ onSearch }) {
//     return (
//     <div>
//       <Toaster />
//       <Formik
//         initialValues={{ query: "" }}
//         onSubmit={(values, actions) => {
//           if (!values.query.trim()) {
//             toast.error("Please type your text!")
//           } else {
//             onSearch(values.query);
//             toast.success("Awesome!🥳")
//             actions.resetForm()
//           }
//         }}>
        
//         <Form>
//           <Field
//             type="text"
//             name="query"
//             placeholder="Type here..."
//             autoComplete="off"
//             autoFocus
//           />
//           <button type="submit">Click to start!</button>
//         </Form>
// </Formik>
//         </div>
    
//   )
// }

import { Form, Field, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from './MovieFilter.module.css';

export default function MovieFilter({ onSearch }) {
    return (
        <div>
            <Toaster />
            <Formik
                initialValues={{ query: "" }}
                onSubmit={(values, actions) => {
                    if (!values.query.trim()) {
                        toast.error("Please type your text!");
                    } else {
                        onSearch(values.query);
                        toast.success("Awesome!🥳");
                        actions.resetForm();
                    }
                }}
            >
                <Form>
                    <Field
                        type="text"
                        name="query"
                        placeholder="Search movie..."
                        autoComplete="off"
                        autoFocus
                    />
                    <button type="submit" className={css.btn}>Click to start!</button>
                </Form>
            </Formik>
        </div>
    );
}
