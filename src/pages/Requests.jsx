import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

function Requests() {
    const [activeTab, setActiveTab] = useState('incoming')
    const [incomingRequests, setIncomingRequests] = useState([])
    const [outgoingRequests, setOutgoingRequests] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [actionError, setActionError] = useState('')
    const [updatingId, setUpdatingId] = useState(null)

    // Fetch incoming and outgoing requests
    useEffect(() => {
        const controller = new AbortController()

        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('accessToken')

                if (!token) {
                    throw new Error('Please log in to view your requests.')
                }

                const response = await fetch(
                    'http://localhost:5001/api/requests',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    }
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(
                        data.message || 'Unable to load requests.'
                    )
                }

                setIncomingRequests(data.incomingRequests || [])
                setOutgoingRequests(data.outgoingRequests || [])

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        fetchRequests()

        return () => controller.abort()
    }, [])

    // Accept or reject an incoming request
    const handleRequestAction = async (requestId, status) => {
        try {
            setActionError('')

            const token = localStorage.getItem('accessToken')

            if (!token) {
                throw new Error('Please log in again.')
            }

            setUpdatingId(requestId)

            const response = await fetch(
                `http://localhost:5001/api/requests/${requestId}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || 'Unable to update request.'
                )
            }

            setIncomingRequests((previousRequests) =>
                previousRequests.map((request) =>
                    request.id === requestId
                        ? { ...request, status: data.request.status }
                        : request
                )
            )

        } catch (err) {
            setActionError(err.message)
        } finally {
            setUpdatingId(null)
        }
    }

    const currentRequests =
        activeTab === 'incoming'
            ? incomingRequests
            : outgoingRequests

    const getInitials = (name = 'Student') => {
        return name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase()
    }

    const formatDate = (date) => {
        if (!date) return 'Date unavailable'

        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
    }

    return (
        <div className="explore-page">

            <main className="explore-main">

                {/* Introduction */}
                <section className="explore-intro">

                    <p className="dashboard-eyebrow">
                        YOUR SKILL EXCHANGE
                    </p>

                    <h1>
                        Exchange <span>requests.</span>
                    </h1>

                    <p>
                        Connect with students, share your knowledge
                        and grow together.
                    </p>

                </section>

                {/* Request Tabs */}
                <section className="explore-controls">

                    <div className="category-filters">

                        <button
                            type="button"
                            className={
                                activeTab === 'incoming' ? 'selected' : ''
                            }
                            onClick={() => {
                                setActiveTab('incoming')
                                setActionError('')
                            }}
                        >
                            Incoming ({incomingRequests.length})
                        </button>

                        <button
                            type="button"
                            className={
                                activeTab === 'outgoing' ? 'selected' : ''
                            }
                            onClick={() => {
                                setActiveTab('outgoing')
                                setActionError('')
                            }}
                        >
                            Outgoing ({outgoingRequests.length})
                        </button>

                    </div>

                </section>

                {/* Error Messages */}
                {error && (
                    <div className="no-results" role="alert">
                        <p>{error}</p>
                    </div>
                )}

                {actionError && (
                    <div className="no-results" role="alert">
                        <p>{actionError}</p>
                    </div>
                )}

                {/* Request Results */}
                <section className="student-results">

                    <div className="results-heading">
                        <h2>
                            {activeTab === 'incoming'
                                ? 'Requests received'
                                : 'Requests sent'}
                        </h2>

                        <span>
                            {currentRequests.length} requests
                        </span>
                    </div>

                    {isLoading && (
                        <div className="no-results">
                            <p>Loading your requests...</p>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div className="student-grid">

                            {currentRequests.map((request) => {
                                const person =
                                    activeTab === 'incoming'
                                        ? request.sender
                                        : request.receiver

                                const skill =
                                    request.requestedSkill?.name ||
                                    'Unknown skill'

                                const isIncoming =
                                    activeTab === 'incoming'

                                const isPending =
                                    request.status === 'PENDING'

                                return (
                                    <article
                                        className="student-card"
                                        key={request.id}
                                    >

                                        <div className="student-card-top">

                                            <div className="student-initials">
                                                {getInitials(person?.fullName)}
                                            </div>

                                            <span className="student-category">
                                                {request.status === 'PENDING'
                                                    ? '🟡 Pending'
                                                    : request.status === 'ACCEPTED'
                                                        ? '✅ Accepted'
                                                        : request.status === 'REJECTED'
                                                            ? '❌ Rejected'
                                                            : request.status}
                                            </span>

                                        </div>

                                        <h3>
                                            {person?.fullName || 'Student'}
                                        </h3>

                                        <p className="student-details">
                                            {person?.course || 'Course not specified'}
                                        </p>

                                        <div className="student-skill">

                                            <span>
                                                {isIncoming
                                                    ? 'WANTS TO LEARN'
                                                    : 'YOU REQUESTED'}
                                            </span>

                                            <strong>{skill}</strong>

                                        </div>

                                        {request.offeredSkill && (
                                            <p className="student-description">
                                                Offered in exchange: {
                                                    request.offeredSkill.name
                                                }
                                            </p>
                                        )}

                                        <p className="student-description">
                                            {request.message ||
                                                'No message provided.'}
                                        </p>

                                        <p className="student-details">
                                            {formatDate(request.createdAt)}
                                        </p>

                                        {/* Incoming request actions */}
                                        {isIncoming && isPending && (
                                            <div className="request-actions">

                                                <button
                                                    type="button"
                                                    className="connect-button"
                                                    disabled={
                                                        updatingId === request.id
                                                    }
                                                    onClick={() =>
                                                        handleRequestAction(
                                                            request.id,
                                                            'ACCEPTED'
                                                        )
                                                    }
                                                >
                                                    {updatingId === request.id
                                                        ? 'Updating...'
                                                        : 'Accept ✓'}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="connect-button request-sent"
                                                    disabled={
                                                        updatingId === request.id
                                                    }
                                                    onClick={() =>
                                                        handleRequestAction(
                                                            request.id,
                                                            'REJECTED'
                                                        )
                                                    }
                                                >
                                                    Reject ✕
                                                </button>

                                            </div>
                                        )}

                                        {!isIncoming && (
                                            <p className="request-success">
                                                {request.status === 'PENDING'
                                                    ? 'Waiting for the student to respond.'
                                                    : `Request ${request.status.toLowerCase()}.`}
                                            </p>
                                        )}

                                        {isIncoming && !isPending && (
                                            <p className="request-success">
                                                Request has been processed.
                                            </p>
                                        )}

                                    </article>
                                )
                            })}

                        </div>
                    )}

                    {/* Empty State */}
                    {!isLoading &&
                        !error &&
                        currentRequests.length === 0 && (
                            <div className="no-results">

                                <span>💌</span>

                                <h3>
                                    {activeTab === 'incoming'
                                        ? 'No incoming requests yet.'
                                        : 'You have not sent any requests yet.'}
                                </h3>

                                <p>
                                    {activeTab === 'incoming'
                                        ? 'When students want to learn from you, their requests will appear here.'
                                        : 'Explore your campus community and connect with students.'}
                                </p>

                                <Link
                                    to="/explore"
                                    className="dashboard-button"
                                >
                                    Explore Skills ↗
                                </Link>

                            </div>
                        )}

                </section>

            </main>
        </div>
    )
}

export default Requests
