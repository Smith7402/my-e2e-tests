// import { expect } from "@wdio/globals";

describe("Timeout verification demo", () => {
  it("should timeout after ~2 minutes when element never appears", async () => {
    const elem = await $("#non-existent-element");
    const start = Date.now();

    try {
      await elem.waitForDisplayed(); // sẽ chờ đúng theo waitforTimeout trong wdio.conf.ts
    } catch (err) {
      const duration = (Date.now() - start) / 1000;
      console.log(`🥑 Thời gian thực tế: ${duration} giây`);
      // Check duration trong khoảng ~120s (± vài giây)
    }
  });
});
