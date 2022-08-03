import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState, FC } from "react";
import { SearchType } from "../../data/@types/search";

export const Seach: FC<SearchType> = ({ searchText, Search, Add, btnText }) => {
  const [name, setName] = useState<string>("");

  return (
    <Box>
      <Box sx={{ mt: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <TextField
                  value={name}
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setName(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder={searchText ?? ''}
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  sx={{ ml: 2, height: '40px' }}
                  onClick={() => Search(name)}
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  color="primary"
                  sx={{
                    height: '40px', whiteSpace: 'nowrap',
                    mt: { sm: '0px', md: '0px', xs: '15px' },
                    width: { sm: 'auto', md: 'auto', xs: '100%' },
                  }}
                  onClick={Add}
                >
                  {btnText ?? "Adicionar"}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
