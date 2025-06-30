import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { AssignmentTurnedIn, Edit, Delete } from "@mui/icons-material";

const LeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const formik = useFormik({
    initialValues: { leaveType: "", description: "" },
    validationSchema: Yup.object({
      leaveType: Yup.string().required("Leave type is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        const updated = [...leaveTypes];
        updated[editIndex] = values;
        setLeaveTypes(updated);
        setEditIndex(null);
      } else {
        setLeaveTypes([...leaveTypes, values]);
      }
      resetForm();
    },
  });

  const handleEdit = (index) => {
    formik.setValues(leaveTypes[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setLeaveTypes(leaveTypes.filter((_, i) => i !== index));
    if (editIndex === index) {
      formik.resetForm();
      setEditIndex(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <AssignmentTurnedIn /> {editIndex !== null ? "Edit" : "Add"} Leave Type
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Leave Type</label>
          <input
            name="leaveType"
            className="w-full border p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.leaveType}
            
          />

          
          {formik.touched.leaveType && formik.errors.leaveType && (
            <p className="text-red-500 text-sm">{formik.errors.leaveType}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                setEditIndex(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Leave Types List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Leave Types List</h3>
        <ul className="divide-y border rounded">
          {leaveTypes.map((item, index) => (
            <li key={index} className="p-4 flex justify-between items-start">
              <div>
                <p className="font-bold">{item.leaveType}</p>
                <p className="text-sm">{item.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600"
                  title="Edit"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600"
                  title="Delete"
                >
                  <Delete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeaveType;
