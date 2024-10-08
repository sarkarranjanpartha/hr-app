import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export interface ClickOnTheReportYouWantToViewProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const ClickOnTheReportYouWantToView = (
  props: ClickOnTheReportYouWantToViewProps
) => {
  const listItems = [
    {
      key: 0,
      display: "Department Collapsible Report",
      return: "DepartmentCollapsibleTable",
    },
    {
      key: 1,
      display: "Employee Collapsible Report",
      return: "EmployeeCollapsibleTable",
    },
  ];

  const { onClose, open } = props;

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Set report you want to view.</DialogTitle>
      <List sx={{ pt: 0 }}>
        {listItems.map((listItem) => (
          <ListItem disableGutters key={listItem.key}>
            <ListItemButton
              onClick={() => handleListItemClick(listItem.return)}
              // sx={{ alignContent: "center" }}
            >
              <ListItemText primary={listItem.display} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
export default ClickOnTheReportYouWantToView;
