import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/ui/Sidebar";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useContent } from "../hooks/useContent";

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  type ContentType = "youtube" | "twitter" | "article";

  interface Content {
    _id?: string;
    title: string;
    link: string;
    type: ContentType;
  }

  const contents = useContent().contents;

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="p-8 ml-64 min-h-screen bg-slate-100">
        <CreateContentModal
          open={isModalOpen}
          onClose={closeModal}
          title="Add Content"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios.post(
                BACKEND_URL + "/api/v1/content",
                {
                  title: titleRef.current?.value,
                  link: linkRef.current?.value,
                  type: typeRef.current?.value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              console.log(
                titleRef.current?.value,
                linkRef.current?.value,
                typeRef.current?.value
              );

              closeModal();
            }}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm">Title</label>
              <input
                ref={titleRef}
                name="title"
                className="border rounded px-2 py-1"
              />

              <label className="text-sm">Link</label>
              <input
                ref={linkRef}
                name="link"
                className="border rounded px-2 py-1"
              />

              <label className="text-sm">Type</label>
              <select
                ref={typeRef}
                name="type"
                className="border rounded px-2 py-1"
              >
                <option value="youtube">youtube</option>
                <option value="twitter">twitter</option>
                <option value="article">article</option>
              </select>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-gray-200"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </CreateContentModal>

        <div className="flex justify-end gap-2">
          <Button
            text={"Add Content"}
            startIcon={<PlusIcon size="sm" />}
            variant={"primary"}
            size={"sm"}
            onClick={openModal}
          />
          <Button
            text={"Share Brain"}
            startIcon={<ShareIcon size="sm" />}
            variant={"secondary"}
            size={"sm"}
            onClick={() => {}}
          />
        </div>

        <div className={"flex gap-8 mt-4  flex-wrap"}>
          {contents.map((c: Content) => (
            <Card key={c._id ?? c.link ?? c.title} type={c.type} link={c.link} title={c.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
