import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { JobEditView } from 'src/sections/job/view';

export default function Page() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get member data from state instead of query
  const selectedMember = location.state?.member || null;
  return (
    <>
      <Helmet>
        <title> Job Edit | Dashboard </title>
      </Helmet>

      <JobEditView job={selectedMember} />
    </>
  );
}
