import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import GlobalChatWindow from './components/GlobalChatWindow';
import RoomChat from './pages/RoomChat';
import WelcomeChat from './pages/WelcomeChat';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<WelcomeChat />}>
      {/* <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} action={contactAction} />
      </Route>
      <Route path="careers" element={<CareersLayout />} errorElement={<CareersError />}>
        <Route
          index
          element={<Careers />}
          loader={careersLoader}
          // errorElement={<CareersError />}
        />
        <Route path=":roomId" element={<CareerDetails />} loader={careerDetailsLoader} />
      </Route> */}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
