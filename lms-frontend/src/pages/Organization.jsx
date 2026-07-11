import { useEffect, useState } from "react";
import api from "../api/axios";

function Organization() {
  const [organizations, setOrganizations] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    organization_name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getOrganizations();
  }, []);

  // Get All
  const getOrganizations = async () => {
    try {
      const res = await api.get("/organization");
      setOrganizations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Create
  const createOrganization = async (e) => {
    e.preventDefault();

    try {
      await api.post("/organization", form);

      alert("Organization Created");

      setForm({
        organization_name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
      });

      getOrganizations();
    } catch (err) {
      console.log(err);
    }
  };

  // Update
  const updateOrganization = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/organization/${editId}`, form);

      alert("Organization Updated");

      setEditId(null);

      setForm({
        organization_name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
      });

      getOrganizations();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const deleteOrganization = async (id) => {
    try {
      await api.delete(`/organization/${id}`);

      alert("Organization Deleted");

      getOrganizations();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit
  const editOrganization = (org) => {
    setEditId(org.organizations_id);

    setForm({
      organization_name: org.organization_name,
      description: org.description,
      email: org.email,
      phone: org.phone,
      address: org.address,
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-5">
        Organization Management
      </h2>

      <form
        onSubmit={editId ? updateOrganization : createOrganization}
        className="grid gap-3 mb-6"
      >
        <input
          placeholder="Organization Name"
          className="border p-2"
          value={form.organization_name}
          onChange={(e) =>
            setForm({
              ...form,
              organization_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Description"
          className="border p-2"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          className="border p-2"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          className="border p-2"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <input
          placeholder="Address"
          className="border p-2"
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          {editId ? "Update Organization" : "Create Organization"}
        </button>

        {editId && (
          <button
            type="button"
            className="bg-gray-600 text-white p-2 rounded"
            onClick={() => {
              setEditId(null);

              setForm({
                organization_name: "",
                description: "",
                email: "",
                phone: "",
                address: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Organization</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {organizations.map((org) => (
            <tr key={org.organizations_id}>
              <td className="border p-2">{org.organizations_id}</td>

              <td className="border p-2">
                {org.organization_name}
              </td>

              <td className="border p-2">{org.email}</td>

              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => editOrganization(org)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() =>
                    deleteOrganization(org.organizations_id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Organization;