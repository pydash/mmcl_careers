"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDate } from "@/utils/formatDate";
import { useAllOffers } from "@/hooks/hr/applicants/useAllOffers";

export function OffersTable() {
  const { offers, loading, error } = useAllOffers();

  return (
    <>
      {loading && (
        <div className="mt-4 text-muted-foreground">Loading Offers...</div>
      )}
      {error && <div className="mt-4 text-destructive">Error: {error}</div>}
      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Date Offer Sent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No Offers found
                </TableCell>
              </TableRow>
            ) : (
              offers.map((offer: any) => (
                <TableRow key={offer.id}>
                  <TableCell>{offer.id}</TableCell>
                  <TableCell>
                    {offer.first_name} {offer.last_name}
                  </TableCell>
                  <TableCell>{offer.title.trim()}</TableCell>
                  <TableCell>{getDate(offer.offered_at)}</TableCell>
                  <TableCell>{offer.status}</TableCell>
                  <TableCell>{offer.email}</TableCell>
                  {/* <TableCell><JobViewButton jobId={job.id} /></TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
