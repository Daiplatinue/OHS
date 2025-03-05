import MyFloatingDockCustomer from '../Styles/MyFloatingDock-Customer';

function MyBookings() {
    return (
        <div>
            {/* Floating Dock - Now at the top */}
            <div className="sticky z-40 flex">
                <MyFloatingDockCustomer />
            </div>

            My Bookings

        </div>
    )
}

export default MyBookings