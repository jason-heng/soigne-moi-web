import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PatientHome from './page';
import { EMPTY_FORM_STATE } from '@/_lib/to-form-state';

const mockUser = {
    firstName: "Julien"
}

jest.mock("react-dom", () => ({
    ...jest.requireActual("react-dom"),
    useFormState: () => [EMPTY_FORM_STATE, null],
    useFormStatus: () => ({ pending: false })
}));

jest.mock("../../_data/users", () => ({
    getUser: () => mockUser
}))

jest.mock("./data", () => ({
    getDoctors: () => [],
    getCurrentStay: () => null,
    getIncomingStay: () => null
}))

jest.mock("next/navigation", () => ({
    useRouter: jest.fn()
}));

describe("Patient Home", () => {
    it("renders the heading", async () => {
        render(await PatientHome())

        const heading = screen.getByRole("heading", { level: 1, name: `Bonjour, ${mockUser.firstName} !` })

        expect(heading).toBeInTheDocument()
    })
})