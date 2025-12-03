import { useEffect, useState } from "react";
import EnhancedCompanyForm from "../../../components/EnhancedCompanyForm";
import EnhancedCompanyTable from "../../../components/EnhancedCompanyTable";
import { Button } from "../../../components/ui/button";
import {
  getCompanies,
  sortCompanies,
} from "../../../app/services/user/sysad/companyService";
import { Card } from "../../../components/ui/card";
import { Select, SelectItem } from "../../../components/ui/select";
import { Input } from "../../../components/ui/input";
import { Search, X } from "lucide-react";

export default function SysadCompaniesPage({ archived = false }) {
  const [pageInfo, setPageInfo] = useState({ page: 1, totalPages: 1 });
  const [order, setOrder] = useState("a-z");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [companies, setCompanies] = useState(null);
  const [editingInfo, setEditingInfo] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getCompanies(setCompanies, setPageInfo, 1, archived, "");
  }, [location.pathname]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Company Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage company registrations and document submissions
          </p>
        </div>
        <Button
          variant={showForm ? "secondary" : "default"}
          onClick={() => {
            setEditingInfo(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "Register New Company"}
        </Button>
      </div>

      {showForm && (
        <EnhancedCompanyForm
          archived={archived}
          companies={companies}
          setCompanies={setCompanies}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
          setEditingInfo={setEditingInfo}
          editingInfo={editingInfo}
          setShowForm={setShowForm}
        />
      )}

      <Card className="p-4 flex items-center gap-x-4">
        <div className="flex items-center gap-x-2">
          Filter
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <SelectItem value={"all"}>All</SelectItem>
            <SelectItem value={"approved"}>Approved</SelectItem>
            <SelectItem value={"pending"}>Pending</SelectItem>
            <SelectItem value={"rejected"}>Rejected</SelectItem>
          </Select>
        </div>
        <div className="flex items-center gap-x-2">
          Order
          <Select value={order} onChange={(e) => setOrder(e.target.value)}>
            <SelectItem value={"a-z"}>Ascending</SelectItem>
            <SelectItem value={"z-a"}>Descending</SelectItem>
          </Select>
        </div>
        <div className="grow flex items-center gap-x-4">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search Company Names"
            required
            className="grow"
          />
          <div className="flex items-center gap-x-2">
            {search && (
              <Button
                variant="secondary"
                className="flex items-center gap-x-1"
                type="submit"
                onClick={async () => {
                  setSearch("");

                  if (searched) {
                    setSearched(false);
                    await getCompanies(
                      setCompanies,
                      setPageInfo,
                      1,
                      archived,
                      ""
                    );
                  }
                }}
              >
                <X className="w-5 pr-1" />
                Cancel
              </Button>
            )}
            <Button
              variant="default"
              className="flex items-center gap-x-1"
              type="submit"
              onClick={async () => {
                setSearched(true);
                await getCompanies(
                  setCompanies,
                  setPageInfo,
                  1,
                  archived,
                  search
                );
              }}
            >
              <Search className="w-5 pr-1" />
              Search
            </Button>
          </div>
        </div>
      </Card>

      {(companies ?? []).length > 0 && (
        <EnhancedCompanyTable
          companies={sortCompanies(filter, companies, order)}
          setCompanies={setCompanies}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
          setEditingInfo={setEditingInfo}
          setShowForm={setShowForm}
          archived={archived}
        />
      )}

      {(companies ?? []).length <= 0 ? (
        <Card className="p-8 text-center">
          {search ? (
            <p className="text-gray-500">
              There are no matching companies for "{search}".
            </p>
          ) : filter ? (
            <p className="text-gray-500">
              There are no{" "}
              {filter !== "all" ? filter : archived ? "archived" : "active"}{" "}
              companies yet.
            </p>
          ) : (
            <p className="text-gray-500">
              There are no {archived ? "archived" : "active"} companies yet.
            </p>
          )}
        </Card>
      ) : (
        <Card className="w-full flex items-center justify-between p-4">
          <p>
            Page {pageInfo.page} out of {pageInfo.totalPages}
          </p>
          <div className="flex items-center gap-x-2">
            {pageInfo.page > 1 && (
              <Button
                size="md"
                variant="secondary"
                onClick={async () =>
                  await getCompanies(
                    setCompanies,
                    setPageInfo,
                    pageInfo.page - 1,
                    archived,
                    ""
                  )
                }
              >
                Prev
              </Button>
            )}
            {pageInfo.page < pageInfo.totalPages && (
              <Button
                size="md"
                variant="secondary"
                onClick={async () =>
                  await getCompanies(
                    setCompanies,
                    setPageInfo,
                    pageInfo.page + 1,
                    archived,
                    ""
                  )
                }
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
