import React, { useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from react-redux
import { addcase, removecase, updatecase } from '../case/caseslice'; // Import actions from your slice
import Modal from '../componets/modal';
import '../index.css'; // Import Tailwind CSS

// Custom GlobalFilter component
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => (
  <span className="block mb-4">
    <input
      className="p-2 border rounded"
      type="text"
      placeholder="Search..."
      value={globalFilter || ''}
      onChange={e => setGlobalFilter(e.target.value)}
    />
  </span>
);

const PictureTableComponent = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const data = useSelector((state) => state.Newcase.cases); // Get data from the Redux store

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', mobileno: '', picture: '', designation: '', cordinate: '' });

  // Columns definition
  const columns = React.useMemo(
    () => [
      {
        Header: 'Picture',
        accessor: 'picture',
        Cell: ({ value }) => <img src={value} alt="Profile" className="w-24 h-24 object-cover" />,
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile No',
        accessor: 'mobileno',
      },
      {
        Header: 'Designation',
        accessor: 'designation',
      },
      {
        Header: 'Cordinate',
        accessor: 'cordinate',
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white p-2 rounded" onClick={() => handleEdit(value)}>Edit</button>
            <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleDelete(value)}>Delete</button>
          </div>
        ),
      },
    ],
    [data]
  );

  // Editing and modal functionality
  const handleEdit = (id) => {
    const item = data.find((i) => i.id === id);
    setEditing(item);
    setFormData({ name: item.name, designation: item.designation, mobileno: item.mobileno, picture: item.picture, cordinate: item.cordinate });
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    dispatch(updatecase({ id: editing.id, updatedData: formData })); // Dispatch the update action
    setEditing(null);
    setFormData({ name: '', mobileno: '', picture: '', designation: '', cordinate: '' });
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    dispatch(addcase(formData)); // Dispatch the add action
    setFormData({ name: '', mobileno: '', picture: '', designation: '', cordinate: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(removecase(id)); // Dispatch the delete action
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Table instance with pagination
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of rows, we now use page
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter, pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Set initial page index
    },
    useGlobalFilter,
    usePagination // Add pagination hook
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      <div className="inline-flex">
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        <button
          className="bg-blue-500 text-white p-2 rounded ml-5"
          onClick={() => { setEditing(null); setFormData({ name: '', mobileno: '', picture: '', designation: '', cordinate: '' }); setIsModalOpen(true); }}
        >
          Add
        </button>
      </div>

      <table className="min-w-[600px] min-h-[400px] w-full bg-white border border-gray-200 rounded-lg shadow-md" {...getTableProps()}>
  <thead className="bg-gray-50">
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <th
            className="p-4 text-left text-sm font-medium text-gray-600 border-b border-gray-200"
            {...column.getHeaderProps()}
          >
            {column.render('Header')}
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps()}>
    {page.map(row => {
      prepareRow(row);
      return (
        <tr
          {...row.getRowProps()}
          className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        >
          {row.cells.map(cell => (
            <td className="p-4 text-sm text-gray-600 border-b border-gray-200" {...cell.getCellProps()}>
              {cell.render('Cell')}
            </td>
          ))}
        </tr>
      );
    })}
  </tbody>
</table>




      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-gray-300 p-2 rounded">
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-gray-300 p-2 rounded">
          Next
        </button>
      </div>

      {/* Page size selection */}
      <div className="mt-2">
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="border p-2"
        >
          {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={editing ? handleUpdate : handleAdd}
        formData={formData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default PictureTableComponent;
