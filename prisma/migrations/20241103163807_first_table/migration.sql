-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "courseEnrolled" TEXT NOT NULL,
    "uni" TEXT NOT NULL,
    "currentCGPA" TEXT NOT NULL,
    "annualIncome" TEXT NOT NULL,
    "graduationYear" TEXT NOT NULL,
    "briefDescription" TEXT NOT NULL,
    "applications" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investor" (
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "linkedInURL" TEXT NOT NULL,
    "twitterURL" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Loan" (
    "borrowerName" TEXT NOT NULL,
    "loanId" INTEGER NOT NULL,
    "loanAmount" TEXT NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "return" TEXT NOT NULL,
    "loanPurpose" TEXT NOT NULL,
    "proposals" TEXT NOT NULL,
    "acceptedProposal" TEXT NOT NULL,
    "proposalAccepted" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Proposal" (
    "proposalId" INTEGER NOT NULL,
    "lenderName" TEXT NOT NULL,
    "linkedinHandle" TEXT NOT NULL,
    "investorRating" TEXT NOT NULL,
    "loansFunded" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Investor_linkedInURL_key" ON "Investor"("linkedInURL");

-- CreateIndex
CREATE UNIQUE INDEX "Investor_twitterURL_key" ON "Investor"("twitterURL");

-- CreateIndex
CREATE UNIQUE INDEX "Loan_loanId_key" ON "Loan"("loanId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_proposalId_key" ON "Proposal"("proposalId");
