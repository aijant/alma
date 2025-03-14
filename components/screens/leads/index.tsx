"use client";

import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useState, useEffect } from "react";
import NavigationMenu from "./navigationMenu";
import { useAuth } from "@/app/authContext";
import Login from "@/components/login";

interface Lead {
  id: number;
  name: string;
  submitted: string;
  status: "Pending" | "Reached Out";
  country: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const leadsPerPage = 5;

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads");
        if (!response.ok) throw new Error("Failed to fetch leads");
        const data = await response.json();
        setLeads(data);
      } catch (err) {
        setError("Error fetching leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const updateStatus = (id: number) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === id && lead.status === "Pending"
          ? { ...lead, status: "Reached Out" }
          : lead
      )
    );
  };

  const filteredLeads = leads.filter(
    (lead) =>
      (statusFilter === "All" || lead.status === statusFilter) &&
      (lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  if (!isAuthenticated) {
    return <Login />;
  }

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex h-screen">
      <NavigationMenu />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Leads</h1>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search by name, country, or status"
            className="w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                {statusFilter === "All" ? "Status" : statusFilter}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {["All", "Pending", "Reached Out"].map((status) => (
                <DropdownItem
                  key={status}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-100 p-3 font-semibold">
            <span>Name</span>
            <span>Submitted</span>
            <span>Status</span>
            <span>Country</span>
          </div>
          <div className="divide-y">
            {currentLeads.length > 0 ? (
              currentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="grid grid-cols-4 p-3 items-center"
                >
                  <span>{lead.name}</span>
                  <span>{lead.submitted}</span>
                  <span
                    className={`cursor-pointer ${lead.status === "Pending" ? "text-blue-500 underline" : ""}`}
                    onClick={() => updateStatus(lead.id)}
                  >
                    {lead.status}
                  </span>
                  <span>{lead.country}</span>
                </div>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                No results found.
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="light"
            className="min-w-5"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              className="min-w-5"
              variant={currentPage === index + 1 ? "solid" : "bordered"}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="light"
            className="min-w-5"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
}
