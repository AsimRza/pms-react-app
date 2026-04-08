import { useEffect, useState } from "react";
import Select from "../../../shared/components/ui/Select";
import Input from "../../../shared/components/ui/Input";
import { useDebounced } from "../../../shared/hooks";
import { useSearchParams } from "react-router";
import { PageHeader } from "../../../shared/components/PageHeader";
import type { IFilter, ISorting } from ".";

const sortingOptions = [
  { label: "Ad", value: "name" },
  { label: "GPA ", value: "gpa" },
  { label: "Ödənişli", value: "paid" },
  { label: "Ödənişsiz", value: "unpaid" },
];

interface IProps {
  sorting: ISorting;
  filter: IFilter;
  setSorting: React.Dispatch<React.SetStateAction<ISorting>>;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

export const StudentFilter: React.FC<IProps> = ({
  sorting,
  setSorting,
  filter,
  setFilter,
  limit,
  setLimit,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("q") || filter.name || "",
  );
  const debouncedSearchValue = useDebounced(searchValue, 500);

  useEffect(() => {
    setFilter((prev) => {
      if (prev.name === debouncedSearchValue) {
        return prev;
      }

      return {
        ...prev,
        name: debouncedSearchValue,
      };
    });
    setSearchParams({
      q: debouncedSearchValue,
    });
  }, [debouncedSearchValue, setFilter]);

  useEffect(() => {
    setSearchValue(filter.name || "");
  }, [filter.name]);

  return (
    <div className="mb-6">
      <PageHeader
        title="Students"
        rightPanel={
          <div className="flex gap-5 items-center">
            <Select
              value={limit.toString()}
              onChange={(e) => setLimit(Number(e.target.value))}
              options={[
                { label: "12", value: 12 },
                { label: "24", value: 24 },
                { label: "48", value: 48 },
              ]}
              placeholder="Limit"
            />
            <Select
              value={sorting ? sorting.name : ""}
              onChange={(e) =>
                setSorting((prev) => ({ ...prev, name: e.target.value }))
              }
              options={sortingOptions}
              placeholder="Filter seçin"
              className="w-100!"
            />

            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search user"
            />
          </div>
        }
      />

      <Input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        placeholder="Search user"
      />
    </div>
  );
};
