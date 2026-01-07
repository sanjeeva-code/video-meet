import { NextRequest, NextResponse } from "next/server";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const channelName = searchParams.get("channel");
  const uid = searchParams.get("uid");

  if (!channelName || !uid) {
    return NextResponse.json(
      { error: "channel and uid are required" },
      { status: 400 }
    );
  }

  const appId = process.env.AGORA_APP_ID!;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE!;

  const expirationTimeInSeconds = 60 * 60; // 1 hour
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpireTimestamp =
    currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    Number(uid),
    RtcRole.PUBLISHER,
    privilegeExpireTimestamp
  );

  return NextResponse.json({ token });
}
