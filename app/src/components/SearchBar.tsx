import React from "react";
import { TextField, Autocomplete, Stack, ToggleButtonGroup, ToggleButton, Box } from "@mui/material";
import { useAppContext } from "../context/context";
interface SearchBarProps {
  search: string;
  setSearch: (search: string) => void;
}

const API_SEARCH_TYPES = ['album', 'artist', 'playlist', 'track', 'show', 'episode'];

export const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  const { searchTypes, setSearchTypes } = useAppContext();
  const handleSelectSearchType = (
    event: React.MouseEvent<HTMLElement>,
    selectedTypes: string[],
  ) => {
    //@ts-expect-error
    setSearchTypes((prevTypes) => {
      if (prevTypes.length === 1 && selectedTypes.length === 0) {
        return prevTypes;
      } else {
        return selectedTypes
      }
    });
  }
  return (
    <Stack spacing={2} sx={{ width: 550 }}>
      <Box sx={{ maxWidth: '550px' }}>
        <ToggleButtonGroup
          color='primary'
          value={searchTypes}
          onChange={handleSelectSearchType}
          aria-label="Platform"
        >
          {API_SEARCH_TYPES.map((type) => (
            <ToggleButton key={type} value={type}>{type}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Autocomplete
        freeSolo
        value={search}
        options={[]}
        onInputChange={(e, value) => setSearch(value)}
        renderInput={(params) => (
          <TextField {...params} label="Search input" variant="outlined" />
        )}
      />
    </Stack>
  );
};
