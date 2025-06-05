"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

export default function AboutYouPage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [valueTemp, setValueTemp] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    occupation: "",
    age: "",
    gender: "",
    Physical_Activity: "",
    Current_Medication: "",
    journalEntries: [],
    trustedContacts: [],
    relaxing_songs: [],
    createdAt: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const fetchUser = async () => {
      console.log("Fetching user with token:", token);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setUser(data);

        setForm({
          email: data.email || "",
          password: "", // Don't prefill
          name: data.name || "",
          occupation: data.occupation || "",
          age: data.age || "",
          gender: data.gender || "",
          Physical_Activity: data.Physical_Activity || "",
          Current_Medication: data.Current_Medication || "",
          journalEntries: data.journalEntries || [],
          trustedContacts: data.trustedContacts || [],
          relaxing_songs: data.relaxing_songs || [],
          createdAt: data.createdAt || "",
        });
        setValueTemp({
          journalEntries: (data.journalEntries || []).join(", "),
          relaxing_songs: (data.relaxing_songs || []).join(", "),
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token") || "";

    const updatedForm = {
      ...form,
      relaxing_songs: valueTemp.relaxing_songs
        ? valueTemp.relaxing_songs
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      journalEntries: valueTemp.journalEntries
        ? valueTemp.journalEntries
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/update`,
        updatedForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setForm(updatedForm);
      setEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const updateContact = (index, field, value) => {
    const updated = [...form.trustedContacts];
    updated[index][field] = value;
    setForm({ ...form, trustedContacts: updated });
  };

  const removeContact = (index) => {
    const updated = [...form.trustedContacts];
    updated.splice(index, 1);
    setForm({ ...form, trustedContacts: updated });
  };

  return (
    
    <div 
      className="relative flex min-h-screen flex-col items-center justify-center bg-[#1D5DCB] text-white overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-4xl space-y-10 px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#C5DFFF] via-[#7AA7F2] to-[#C5DFFF] bg-clip-text text-transparent">
            Tell Us More About Yourself
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7AA7F2] to-[#C5DFFF] mx-auto rounded-full" />
        </div>
  
        {user ? (
          <>
            {/* User Form */}
            <div className="backdrop-blur-lg bg-white/15 border border-white/30 rounded-2xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(form).map(([key, value]) => {
                  if (key === "trustedContacts") return null;
                  const isArray = Array.isArray(value);
                  const isReadOnly = key === "createdAt";
  
                  return (
                    <div key={key} className={`flex flex-col ${(key === "relaxing_songs" || key === "journalEntries") ? 'md:col-span-2' : ''}`}>
                      <label htmlFor={key} className="mb-2 capitalize text-[#C5DFFF] font-medium">
                        {key.replace(/_/g, " ")}
                      </label>
  
                      {key === "relaxing_songs" || key === "journalEntries" ? (
                        <textarea
                          disabled={!editing}
                          name={key}
                          id={key}
                          value={valueTemp[key] ?? ""}
                          onChange={(e) => setValueTemp({ ...valueTemp, [key]: e.target.value })}
                          className={cn(
                            "w-full rounded-xl px-4 py-3 h-28 bg-white/15 backdrop-blur-sm text-white placeholder-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] focus:border-[#4D86E0] transition-all duration-300 resize-none",
                            (!editing || isReadOnly) && "opacity-60 cursor-not-allowed"
                          )}
                          placeholder={`Enter ${key.replace(/_/g, " ")} (comma separated)`}
                        />
                      ) : isArray ? (
                        <textarea
                          disabled
                          name={key}
                          id={key}
                          value={value.join(", ")}
                          className="w-full rounded-xl px-4 py-3 h-20 bg-white/15 backdrop-blur-sm text-white border border-white/40 opacity-60 cursor-not-allowed resize-none"
                          placeholder={`Enter ${key}`}
                        />
                      ) : (
                        <input
                          type={key === "password" ? "password" : key === "age" ? "number" : "text"}
                          name={key}
                          id={key}
                          disabled={!editing || isReadOnly}
                          value={value}
                          onChange={handleChange}
                          className={cn(
                            "w-full rounded-xl px-4 py-3 bg-white/15 backdrop-blur-sm text-white placeholder-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] focus:border-[#4D86E0] transition-all duration-300",
                            (!editing || isReadOnly) && "opacity-60 cursor-not-allowed"
                          )}
                          placeholder={`Enter ${key.replace(/_/g, " ")}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
  
            {/* Trusted Contacts */}
            <div className="backdrop-blur-lg bg-white/15 border border-white/30 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-6 text-[#C5DFFF] flex items-center">
                <div className="w-2 h-2 bg-[#7AA7F2] rounded-full mr-3 animate-pulse" />
                Trusted Contacts
              </h2>
  
              {form.trustedContacts.length === 0 && editing && (
                <button
                  onClick={() => setForm((prev) => ({
                    ...prev,
                    trustedContacts: [...prev.trustedContacts, { name: "", phone: "", relationship: "" }],
                  }))}
                  className="px-6 py-3 bg-gradient-to-r from-[#4D86E0] to-[#7AA7F2] rounded-xl text-white font-medium hover:from-[#7AA7F2] hover:to-[#C5DFFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add Contact
                </button>
              )}
  
              <div className="space-y-4">
                {form.trustedContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="border border-white/30 p-6 rounded-xl bg-white/15 backdrop-blur-sm space-y-4 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["name", "phone", "relationship"].map((field) => (
                        <input
                          key={field}
                          type="text"
                          disabled={!editing}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={contact[field]}
                          onChange={(e) => updateContact(index, field, e.target.value)}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#7AA7F2] transition-all duration-300"
                        />
                      ))}
                    </div>
  
                    {editing && (
                      <button
                        onClick={() => removeContact(index)}
                        className="text-red-300 hover:text-red-400 font-medium transition-colors duration-300 px-2 py-1 rounded hover:bg-red-500/10"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
  
              {editing && form.trustedContacts.length > 0 && (
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      trustedContacts: [...prev.trustedContacts, { name: "", phone: "", relationship: "" }],
                    }))
                  }
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-[#4D86E0] to-[#7AA7F2] rounded-xl text-white font-medium hover:from-[#7AA7F2] hover:to-[#C5DFFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add Another Contact
                </button>
              )}
            </div>
  
            {/* Action Buttons */}
            <div className="flex justify-center gap-6 pt-8">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-8 py-4 bg-gradient-to-r from-[#4D86E0] to-[#7AA7F2] hover:from-[#7AA7F2] hover:to-[#C5DFFF] rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#134BB3] via-[#1D5DCB] to-[#4D86E0] hover:from-[#4D86E0] hover:to-[#7AA7F2] rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Edit Info
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="inline-flex items-center justify-center space-x-3">
              <div className="w-6 h-6 border-3 border-[#7AA7F2] border-t-transparent rounded-full animate-spin" />
              <p className="text-xl text-[#C5DFFF]">Loading your info...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
  
  
            
}
