// src/components/PictureTableComponent.js
import React, { useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import Modal from '../componets/modal';
import '../index.css'; // Import Tailwind CSS

// Sample data with images
const initialData = [
  { id: 1, name: 'John Doe', mobileno: 28, picture: 'https://via.placeholder.com/100', designation: 'Manager', cordinate: 'kld' },
  { id: 2, name: 'Jane Smith', mobileno: 34, picture: 'https://via.placeholder.com/100', designation: 'Software Dev', cordinate: 'ldkj' },
  // Add more data for pagination
];

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
  const [data, setData] = useState(initialData);
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
    setData(data.map((item) =>
      item.id === editing.id ? { ...item, ...formData } : item
    ));
    setEditing(null);
    setFormData({ name: '', mobileno: '', picture: '', designation: '', cordinate: '' });
    setIsModalOpen(false);
  };

  const handleAdd = () => {
    setData([...data, { id: Date.now(), ...formData }]);
    setFormData({ name: '', mobileno: '', picture: '', designation: '', cordinate: '' });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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

      <table className="min-w-full bg-white border border-gray-200" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="p-2 border-b" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td className="p-2 border-b" {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
          {[5,10,15, 20,25, 30,35, 40, 45,50].map(pageSize => (
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
