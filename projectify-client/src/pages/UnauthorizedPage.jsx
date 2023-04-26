import { useNavigate } from "react-router-dom";
import { Button } from '@mantine/core';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <div>Unauthorized</div>
      <Button variant="light" onClick={goBack}>
        Go Back
      </Button>
    </div>
  )
}

export default UnauthorizedPage