import { formatDate } from "@/data/dateFormatter";
import { RootState } from "@/redux/store";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CompanyTable() {
  const { userCompanies, searchCompanyByText } = useSelector(
    (state: RootState) => state.company
  );

  const [filterCompany, setFilterCompany] = useState(userCompanies);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      userCompanies.length > 0
        ? userCompanies.filter((company) => {
            if (!searchCompanyByText) {
              return true;
            }
            return company?.name
              ?.toLowerCase()
              .includes(searchCompanyByText.toLowerCase());
          })
        : [];

    setFilterCompany(filteredCompany);
  }, [userCompanies, searchCompanyByText]);

  return (
    <div className="max-w-6xl p-6 mx-auto my-10 bg-white rounded-md">
      <h1 className="text-2xl font-extrabold text-hivebg-300">
        Your Registered Companies
      </h1>

      <div className="overflow-x-auto">
        {filterCompany.length === 0 ? (
          <p className="mt-5 text-lg font-bold text-red-500">
            No companies found.
          </p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg table-auto">
            <caption className="mt-5 mb-4 text-lg font-bold text-gray-700">
              A list of your recent registered companies
            </caption>
            <thead className="text-white bg-hiveblue-500">
              <tr className="text-left">
                <th className="p-4 sm:p-2">Logo</th>
                <th className="p-4 sm:p-2">Name</th>
                <th className="p-4 sm:p-2">Date</th>
                <th
                  className="p-4 text-right sm:p-2"
                  style={{ width: "150px" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filterCompany?.map((company) => (
                <tr
                  key={company.id}
                  className="transition duration-300 border-b hover:bg-gray-50"
                >
                  <td className="p-4 sm:p-2">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="object-cover w-10 h-10 rounded-md"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800 sm:p-2">
                    {company.name}
                  </td>
                  <td className="p-4 text-gray-600 sm:p-2">
                    {formatDate(company.createdAt.toString())}
                  </td>
                  <td className="flex flex-row-reverse p-4 mr-auto text-right sm:p-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/companies/update/${company.id}`)
                      }
                      className="flex items-center justify-end gap-2 p-2 text-sm font-medium text-white rounded-md bg-hivebg-300 hover:bg-hivebg-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
