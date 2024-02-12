import { Card } from "@mui/material";
import { styled } from "styled-components";
import colors from "../../theme/colors";


export const StyledCard = styled(Card)`
    background-color: ${colors.cardbg} !important;
    padding: 20px;
    height: 100%;
    overflow: scroll;
`