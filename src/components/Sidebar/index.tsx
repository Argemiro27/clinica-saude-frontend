import styled from "styled-components";
import colors from "../../theme/colors";

const Sidebar = styled.div`
  background-color: ${colors.secondary};
  height: 100%;
  width: 300px;
  max-width: 300px;
  display: block;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-right: 1px solid #cfcfcf;
  .btn-sidebar-usuario {
    background-color: ${colors.primary} !important;
    border: none;
  }

  .btn-link-sidebar {
    background-color: ${colors.bgcolor} !important;
    margin: 5px;
    color: #353535 !important;
    text-decoration: none;
    font-size: 12px !important;
    display: flex;
    align-items: center;
  }

  .collapse-sidebar {
    background-color: #333333;
    color: #b8b8b8;
    font-weight: bold;
    border-radius: 0 0 5px 5px;
    font-size: 12px;
    width: 70%;
  }

  a,
  li {
    color: inherit !important;
    text-decoration: none !important;
  }

  .links-collapse {
    list-style-type: none;
    display: block !important;
  }

  /* Ou alternativamente, aplicar diretamente nos itens de lista */
  .links-collapse li {
    list-style-type: none;
    margin-bottom: 5px;
  }

  .link-icon{
    margin-right: 5px;
  }
`;

export default Sidebar;
